import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: { owner: 'zuqiu2024', name: 'Firefly' },
  },
  collections: {
    posts: collection({
      label: '文章',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: '标题' } }),
        description: fields.text({ label: '摘要', multiline: true }),
        published: fields.date({ label: '发布日期' }),
        category: fields.text({ label: '分类' }),
        tags: fields.array(fields.text({ label: '标签' }), {
          itemLabel: props => props.value,
        }),
        image: fields.text({ label: '封面图片路径' }),
        draft: fields.checkbox({ label: '草稿', defaultValue: false }),
        content: fields.markdoc({ label: '内容' }),
      },
    }),
  },
});