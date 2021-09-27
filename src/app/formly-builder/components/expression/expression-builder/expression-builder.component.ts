import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FieldArrayType, FormlyFieldConfig } from '@ngx-formly/core';
import { Subject } from 'rxjs';

import { FunctionHelpers } from 'src/app/formly-builder/helpers/base.helper';
import { StatementEditorComponent } from 'src/app/formly-builder/modals/statement-editor/statement-editor.component';

// import { AppGraphConfiguration, Node, NodeDimension, ClusterNode, Edge } from '../../app-graph/models/app-graph.models';

const EDGE_ID_DELIMETER = '_DELIMETER_EDGE_DELIMETER_';
const NODE_PARENT_ID_DELIMETER = '_DELIMETER_NODE_PARENT_DELIMETER_';
// const NODE_DIMENSION: NodeDimension = { width: 300, height: 100 };

@Component({
  selector: 'expression-builder',
  templateUrl: './expression-builder.component.html',
  styleUrls: ['./expression-builder.component.scss']
})
export class ExpressionBuilderComponent extends FieldArrayType {
  /* public clusters: ClusterNode[];
  public edges: Edge[];
  public nodes: Node[];
  public graphConfiguration: AppGraphConfiguration;
  public showGraph: boolean;
  public updateGraph$: Subject<boolean>;
  public zoomToFit$: Subject<boolean>;

  constructor(private dialog: MatDialog) {
    super();

    this.clusters = [];
    this.edges = [];
    this.nodes = [];
    this.showGraph = false;
    this.updateGraph$ = new Subject<boolean>();
    this.zoomToFit$ = new Subject<boolean>();
    this.graphConfiguration = {
      layout: 'dagreCluster',
      showMiniMap: true
    };
  }

  add(i?: number, initialModel?: any, markAsDirty?: any) {
    if (this.options?.updateInitialValue) {
      this.options.updateInitialValue();
    }

    let index: number = (i === undefined || i === null) ? this.field.fieldGroup?.length || 0 : i;

    if (index > 0) {
      return;
    }

    super.add(index, initialModel, markAsDirty);

    if (this.field?.fieldGroup && this.field.fieldGroup[index]) {
      let newField = this.field.fieldGroup[index];

      newField.model['_referenceId'] = FunctionHelpers.generateId();

      this.edit(newField);
    }
  }

  edit(formField: FormlyFieldConfig) {
    this.dialog.open(StatementEditorComponent, {
      data: formField,
      disableClose: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'resizable-overlay'
    }).afterClosed();
  }

  buildGraphParts() {
    this.clusters = [];
    this.edges = [];
    this.nodes = [];

    console.log(JSON.stringify(this.field.model, null, 2));

    let root: Node = {
      id: 'root',
      label: 'Evaluate',
      dimension: NODE_DIMENSION,
      // data: data
      // position: NodePosition,
      // transform: string,
      // meta: any,
    };

    this.nodes.push(root);

    this.field.fieldGroup?.forEach((fg: any) => this._buildNodesFromStatement(fg, root));

    this.showGraph = true;
    this.updateGraph$.next(true);
    this.zoomToFit$.next(true);
  }

  private _buildNodesFromStatement(statementField: FormlyFieldConfig, parentNode: Node | null = null) {
    if (!statementField?.fieldGroup?.length) {
      return;
    }

    let operator = this._getFieldByKey(statementField, 'operator');
    let leftHandSide = this._getFieldByKey(statementField, 'leftHandSide');
    let rightHandSide = this._getFieldByKey(statementField, 'rightHandSide');

    let leftNode = this._buildNode(leftHandSide);
    let rightNode = this._buildNode(rightHandSide);

    let statementLabel = statementField.options?.formState?.builder?.options.statementComparisonOperators.find((x: any) => x.value === operator?.formControl?.value)?.label;

    let data = {
      clickFunction: this.edit.bind(this),
      fieldToEdit: statementField,
      showOpen: true,
    };

    let evaluationNode: Node = {
      id: leftNode.id + NODE_PARENT_ID_DELIMETER + rightNode.id,
      label: statementLabel,
      data: data,
      dimension: NODE_DIMENSION,
      // position: NodePosition,
      // transform: string,
      // meta: any,
    };

    let clusterNode: ClusterNode = {
      id: leftNode.id + '_' + rightNode.id,
      label: statementLabel,
      childNodeIds: [leftNode.id, evaluationNode.id, rightNode.id],
      // dimension: CLUSTER_DIMENSION,
      // data: data,
      // position: NodePosition,
      // transform: string,
      // meta: any,
    };

    this.nodes.push(evaluationNode)
    this.clusters.push(clusterNode);

    // this._buildEdge(leftNode, rightNode, statementLabel);

    if (parentNode) {
      this._buildEdge(parentNode, evaluationNode, parentNode.label);
      // this._buildEdge(parentNode, rightNode, parentNode.label);
    }

    // this._buildEdge(leftNode, evaluationNode, '');
    this._buildEdge(evaluationNode, rightNode, '');
    this._buildEdge(evaluationNode, leftNode, '');

    this._buildDescendantNodes(leftHandSide, leftNode);
    this._buildDescendantNodes(rightHandSide, rightNode);
  }

  private _buildDescendantNodes(sourceField?: FormlyFieldConfig, parentNode?: Node | null) {
    if (!sourceField?.fieldGroup?.length) {
      return;
    }

    if (sourceField?.model?.comparisonAgainst === 'statement') {
      let statementField = this._getFieldByKey(sourceField, 'statement');
      statementField?.fieldGroup?.forEach((fg: any) => this._buildNodesFromStatement(fg, parentNode));
    }
  }

  private _buildNode(nodeField?: FormlyFieldConfig): Node {
    if (!nodeField) {
      return {} as Node;
    }

    let label = nodeField.options?.formState?.builder?.options.statementComparisonTypes.find((x: any) => x.value === nodeField.model?.comparisonAgainst)?.label || nodeField.key as string;
    let data: any = {
      type: nodeField.model?.comparisonAgainst
    };

    switch (nodeField.model?.comparisonAgainst) {
      case 'differentFieldAnswer':
        data['description'] = 'Some Field';
        break;
      case 'predefined':
        data['description'] = 'Value: ' + nodeField.model.predefined;
        break;
      case 'token':
        data['description'] = 'Token: ' + nodeField.model.token;
        break;
      default:
        data['description'] = nodeField.model.comparisonAgainst;
        break;
    }

    let node: Node = {
      id: nodeField.id as string,
      label: label,
      data: data,
      dimension: NODE_DIMENSION,
      // position: NodePosition,
      // transform: string,
      // meta: any,
    };

    this.nodes.push(node);

    return node;
  }

  private _buildEdge(sourceNode: Node, targetNode: Node, label?: string): Edge {
    let edge = {
      source: sourceNode.id,
      target: targetNode.id,
      id: sourceNode.id + EDGE_ID_DELIMETER + targetNode.id,
      label: label,
      // data?: any,
      // points?: any,
      // line?: string,
      // textTransform?: string,
      // textAngle?: number,
      // oldLine?: any,
      // oldTextPath?: string,
      // textPath?: string,
      // midPoint?: NodePosition,
    };

    this.edges.push(edge);

    return edge;
  }

  private _getFieldByKey(f: FormlyFieldConfig, key: string): FormlyFieldConfig {
    return f?.fieldGroup?.find(x => x.key === key) || {};
  }

  private _isNullOrUndefined(value: any) {
    return value === undefined || value === null;
  } */
}
