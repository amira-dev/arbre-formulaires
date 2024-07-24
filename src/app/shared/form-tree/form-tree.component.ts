import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TreeNode {
  name: string;
  fullPath: string;   //chemin complet du formulaire
  children?: TreeNode[];
  collapsed?: boolean;  // Indique si le nœud est replié ou déplié
}

@Component({
  selector: 'app-form-tree',
  templateUrl: './form-tree.component.html',
  styleUrls: ['./form-tree.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class FormTreeComponent implements OnInit, OnChanges {

  @Input() dataList: string[] = []; // Liste des formulaires en entrée
  @Input() levels: number = 3;  // Nombre de niveaux hiérarchiques 
  @Input() separator: string = '-';
  @Input() theme: 'dark' | 'light' = 'light';
  @Output() formSelected = new EventEmitter<string>(); // Événement émis lors de la sélection d'un formulaire


  tree: TreeNode[] = [];  // Structure de l'arborescence
  selectedNodePath: string = '';   // Chemin du nœud sélectionné

  ngOnInit() {
    this.buildTree();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataList']) {
      this.buildTree();
    }
  }

  /**
   * Construit l'arborescence à partir de la liste de formulaires.
   */
  buildTree() {
    const map = new Map<string, TreeNode>();
    this.dataList.forEach(item => {
      const levels = item.split(this.separator);
      this.addNode(map, levels, item);
    });

    this.tree = Array.from(map.values());
    console.log(this.tree);
  }

  /**
   * Ajoute un nœud à l'arborescence.
   * @param map - Carte pour stocker les nœuds
   * @param levels - Niveaux hiérarchiques du formulaire
   * @param fullPath - Chemin complet du formulaire
   */
  addNode(map: Map<string, TreeNode>, levels: string[], fullPath: string) {
    const level1 = levels[0];
    const level2 = levels[1];
    const level3 = levels.slice(2).join(this.separator);

    // Si le niveau 1 n'existe pas, le créer
    if (!map.has(level1)) {
      map.set(level1, { name: level1, fullPath: '', children: [], collapsed: true });
    }

    const nodeLevel1 = map.get(level1);

    // Si le niveau 2 n'existe pas sous le niveau 1, le créer
    if (!nodeLevel1!.children!.some(child => child.name === level2)) {
      nodeLevel1!.children!.push({ name: level2, fullPath: '', children: [], collapsed: true });
    }

    const nodeLevel2 = nodeLevel1!.children!.find(child => child.name === level2);

    // Ajouter le niveau 3 sous le niveau 2
    if (level3) {
      nodeLevel2!.children!.push({
        name: level3,
        fullPath: fullPath,
        collapsed: true
      });
    } else {
      nodeLevel2!.fullPath = fullPath;
    }
  }

  /**
   * Gère la sélection d'un nœud feuille.
   * @param node - Nœud sélectionné
   */
  onNodeSelected(node: TreeNode) {
    if (!node.children || node.children.length === 0) {
      this.selectedNodePath = node.fullPath;
      this.formSelected.emit(node.fullPath);
    }
  }

  /**
   * Replie ou déplie un nœud.
   * @param node - Nœud à replier ou déplier
   */
  toggleNode(node: TreeNode) {
    node.collapsed = !node.collapsed;
  }

  /**
   * Vérifie si un nœud est sélectionné.
   * @param node - Nœud à vérifier
   * @returns Vrai si le nœud est sélectionné, faux sinon
   */
  isSelected(node: TreeNode): boolean {
    return node.fullPath === this.selectedNodePath;
  }
}
