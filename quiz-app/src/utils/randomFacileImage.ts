const IMAGE_BASE = "https://www.anglaisfacile.com/cgi2/myexam/images2/";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function probeImage(url: string, timeoutMs: number): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    let done = false;
    const timeout = window.setTimeout(() => {
      if (done) return;
      done = true;
      img.onload = null;
      img.onerror = null;
      resolve(false);
    }, timeoutMs);

    img.onload = () => {
      if (done) return;
      done = true;
      window.clearTimeout(timeout);
      img.onload = null;
      img.onerror = null;
      resolve(true);
    };
    img.onerror = () => {
      if (done) return;
      done = true;
      window.clearTimeout(timeout);
      img.onload = null;
      img.onerror = null;
      resolve(false);
    };
    img.decoding = "async";
    img.referrerPolicy = "no-referrer";
    img.src = url;
  });
}

export async function findRandomImageUrlOnFacile(): Promise<string | null> {
  const timeoutPerImage = 6000;
  const candidatesPerRound = 6;
  const maxRounds = 4;

  for (let round = 0; round < maxRounds; round++) {
    const list = Array.from({ length: candidatesPerRound }, () => {
      const n = randomInt(1000, 35000);
      const ext = Math.random() < 0.2 ? "gif" : "jpg";
      return `${IMAGE_BASE}${n}.${ext}`;
    });

    const results = await Promise.all(list.map((url) => probeImage(url, timeoutPerImage)));
    const idx = results.findIndex((ok) => ok);
    if (idx >= 0) {
      return list[idx];
    }
  }
  return null;
}
