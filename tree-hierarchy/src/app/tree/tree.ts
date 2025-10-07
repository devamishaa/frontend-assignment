import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-tree',
  imports: [CommonModule],
  templateUrl: './tree.html',
  styleUrl: './tree.css'
})
export class Tree {
  // list
  protected readonly tree = signal<Record<string, string[]>>({
    a: ['b', 'c'],
    b: ['d', 'e'],
    c: ['f', 'g'],
    e: ['h', 'i'],
    f: ['j', 'k']
  });

  protected readonly root = computed(() => {
    const adjacency = this.tree();
    const allParents = new Set(Object.keys(adjacency));
    const allChildren = new Set<string>();
    for (const children of Object.values(adjacency)) {
      for (const child of children) {
        allChildren.add(child);
      }
    }
    for (const parent of allParents) {
      if (!allChildren.has(parent)) return parent;
    }
    return Object.keys(adjacency)[0] ?? '';
  });

  protected getChildrenOf(node: string): string[] {
    return this.tree()[node] ?? [];
  }
}
