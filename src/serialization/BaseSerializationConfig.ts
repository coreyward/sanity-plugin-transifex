import { h } from '@sanity/block-content-to-html'

export const defaultStopTypes = [
  'reference',
  'date',
  'datetime',
  'file',
  'geopoint',
  'image',
  'number',
  'crop',
  'hotspot',
  'boolean',
]

export const customSerializers: Record<string, any> = {
  unknownType: (props: Record<string, any>) =>
    h('div', { className: props.node._type }, ''),
  types: {
    block: (props: Record<string, any>) => {
      return h('p', { id: props.node._key }, props.children)
    },
  },
  list: (props: Record<string, any>) => {
    const tag = props.type === 'bullet' ? 'ul' : 'ol'
    return h(tag, { id: props.key.replace('-parent', '') }, props.children)
  },
  listItem: (props: Record<string, any>) => {
    const children =
      !props.node.style || props.node.style === 'normal'
        ? // Don't wrap plain text in paragraphs inside of a list item
          props.children
        : // But wrap any other style in whatever the block serializer says to use
          h(props.serializers.types.block, props, props.children)

    return h('li', { id: props.node._key }, children)
  },
}

export const customDeserializers: Record<string, any> = { types: {} }

export const customBlockDeserializers = []
