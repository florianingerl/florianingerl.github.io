import type { TreeNode } from "primevue/treenode";
import type { Topic } from "@/types/quiz";

// Baut aus der flachen Themen-Liste einen Baum (PrimeVue-TreeNode). Ein Thema
// haengt ueber parentId an seinem Elternthema; alle anderen sind Wurzeln.
export function buildTopicTree(topics: Topic[]): TreeNode[] {
  const map = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  topics.forEach((t) => {
    if (t._id) {
      map.set(t._id, { key: t._id, label: t.title, data: t, children: [] });
    }
  });

  topics.forEach((t) => {
    if (!t._id) return;
    const node = map.get(t._id);
    if (!node) return;
    if (t.parentId && map.has(t.parentId)) {
      const parent = map.get(t.parentId)!;
      parent.children!.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

// Liefert die Kette der Themen vom Wurzelthema bis zum Thema mit dieser _id.
export function findTopicPath(topics: Topic[], id: string): Topic[] {
  const map = new Map<string, Topic>();
  topics.forEach((t) => {
    if (t._id) map.set(t._id, t);
  });

  const pfad: Topic[] = [];
  let current = map.get(id);
  const gesehen = new Set<string>();
  while (current && !gesehen.has(current._id!)) {
    gesehen.add(current._id!);
    pfad.unshift(current);
    current = current.parentId ? map.get(current.parentId) : undefined;
  }
  return pfad;
}

// Schreibt die Titel eines Themenpfades mit "->" getrennt hintereinander.
export function topicPathString(topics: Topic[], id: string): string {
  return findTopicPath(topics, id)
    .map((t) => t.title)
    .join("->");
}
