export declare type GenericRenderNodeType = import('vue').VNode<
  import('vue').RendererNode,
  import('vue').RendererElement,
  { [key: string]: any }
>

export declare type GenericCommonType = import('vue').VNodeProps &
  import('vue').AllowedComponentProps &
  import('vue').ComponentCustomProps

export declare type GenericCtx<S = {}, E = any> = {
  attrs: any
  slots: S
  emit: E
}
export declare interface GenericReturnInstance<T> extends GenericCtx {
  props: T & GenericCommonType
  expose(exposed: import('vue').ShallowUnwrapRef<{}>): void
}
