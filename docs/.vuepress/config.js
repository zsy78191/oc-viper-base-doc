module.exports = {
  'title': 'VB开发文档',
  'description': 'oc-viper-base是一个基于CocoaTouch开发的类VIPER框架，用于高效开发可维护性高的iOS项目',
  'dest': 'public',
  'head': [
    [
      'link',
      {
        'rel': 'icon',
        'href': '/favicon.ico'
      }
    ],
    [
      'meta',
      {
        'name': 'viewport',
        'content': 'width=device-width,initial-scale=1,user-scalable=no'
      }
    ]
  ],
  'theme': 'reco',
  'themeConfig': {
    'nav': [
      {
        'text': '首页',
        'link': '/',
        'icon': 'reco-home'
      },
      {
        'text': '时间轴',
        'link': '/timeline/',
        'icon': 'reco-date'
      }
    ],
    'type': 'blog',
    'blogConfig': {
      'category': {
        'location': 2,
        'text': '文章分类'
      },
      'tag': {
        'location': 3,
        'text': '文章标签'
      }
    },

    'logo': '/logo.png',
    'search': true,
    'searchMaxSuggestions': 10,
    'sidebar': 'auto',
    'lastUpdated': 'Last Updated',
    'author': '',
    'authorAvatar': '/avatar.png',
    'record': '苏ICP备18064390号-1',
    'startYear': '2020'
  },
  'markdown': {
    'lineNumbers': true
  }
}
