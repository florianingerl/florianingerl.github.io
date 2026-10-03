import { computed, ref } from "vue";
import { defineStore } from "pinia";
import {
  fehlerText,
  getAuthenticatedUser,
  login as loginRequest,
  register as registerRequest,
  updateUser,
} from "../api";
import { getToken, setToken } from "../authToken";
import type { User } from "../types";

// Der Store haelt Token und Benutzer. Er wird von allen Quiz-Apps auf der
// Seite benutzt, deshalb wird das Token auch im localStorage abgelegt (siehe
// authToken.ts).
export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(getToken());
  const user = ref<User | null>(null);
  // Mehrere Quiz-Apps auf derselben Seite starten gleichzeitig. Das verhindert,
  // dass /api/auth/user mehrfach aufgerufen wird.
  const sessionWirdGeprueft = ref(false);

  const angemeldet = computed(() => token.value !== null && user.value !== null);
  const email = computed(() => user.value?.email ?? "");

  function abmelden(): void {
    token.value = null;
    user.value = null;
    setToken(null);
  }

  // Der Server antwortet auf /api/auth/user erst mit dem Token aus dem Header.
  // Misslingt das (abgelaufenes Token), ist die Sitzung ungueltig.
  async function benutzerLaden(): Promise<User | null> {
    if (!token.value) return null;
    try {
      user.value = await getAuthenticatedUser();
      return user.value;
    } catch (e) {
      console.error("The user couldn't be loaded:", fehlerText(e, ""));
      abmelden();
      return null;
    }
  }

  // Beim Laden der Seite eine noch vorhandene Anmeldung fortsetzen.
  async function sitzungWiederherstellen(): Promise<void> {
    if (!token.value || sessionWirdGeprueft.value) return;
    sessionWirdGeprueft.value = true;
    try {
      await benutzerLaden();
    } finally {
      sessionWirdGeprueft.value = false;
    }
  }

  async function anmelden(email: string, passwort: string): Promise<void> {
    const antwort = await loginRequest({ email, password: passwort });
    token.value = antwort.token;
    setToken(antwort.token);
    // Ohne den Benutzer aus /api/auth/user ist die Anmeldung nicht vollstaendig.
    if (!(await benutzerLaden())) {
      throw new Error(
        "The login worked, but the user couldn't be loaded. Please try again."
      );
    }
  }

  // /api/register schickt zwar schon ein Token mit, angemeldet wird aber erst
  // mit /api/login, damit das Passwort nicht noch einmal geschickt werden muss.
  async function registrieren(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<void> {
    await registerRequest(data);
  }

  async function profilSpeichern(name: string): Promise<void> {
    const id = user.value?._id;
    if (!id) throw new Error("The user has no _id, so the profile can't be saved.");
    await updateUser(id, { name });
    // /api/user/:id schickt den Benutzer mit Passwort zurueck, deshalb wird er
    // ueber /api/auth/user noch einmal sauber geholt.
    await benutzerLaden();
  }

  return {
    token,
    user,
    angemeldet,
    email,
    anmelden,
    registrieren,
    profilSpeichern,
    abmelden,
    sitzungWiederherstellen,
  };
});
