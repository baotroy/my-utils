export interface Component {
  type: string,
  baseType: string;
  components: Component[] | null;
  arrayChildren?: Component,
  value?: any
}