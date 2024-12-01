export interface FigmaFile {
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  document: DocumentNode;
  components: Record<string, Component>;
  schemaVersion: number;
  styles: Record<string, Style>;
}

export interface DocumentNode {
  id: string;
  name: string;
  type: string;
  children: Node[];
}

export interface Node {
  id: string;
  name: string;
  type: string;
  children?: Node[];
  fills?: Paint[];
  strokes?: Paint[];
  strokeWeight?: number;
  opacity?: number;
}

export interface Paint {
  type: string;
  color?: Color;
  gradientStops?: GradientStop[];
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface GradientStop {
  position: number;
  color: Color;
}

export interface Component {
  key: string;
  name: string;
  description: string;
}

export interface Style {
  key: string;
  name: string;
  description: string;
  styleType: string;
}
