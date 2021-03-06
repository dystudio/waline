# 服务端配置

## 基础配置

服务端大部分的配置是通过环境变量进行配置的，如果是在 Vercel 的话可以在 <kbd>Settings</kbd> - <kbd>Environment Variables</kbd> 中进行设置。设置完毕之后需要进行重新部署才能生效。

| 环境变量名称      | 必填 | 备注                                         |
| ----------------- | ---- | -------------------------------------------- |
| `LEAN_ID`         | √    | LeanCloud 应用的 App ID                      |
| `LEAN_KEY`        | √    | LeanCloud 应用的 App Key                     |
| `LEAN_MASTER_KEY` | √    | LeanCloud 应用的 Master Key 用于后台修改数据 |
| `LEAN_SERVER`     |      | LeanCloud 服务地址，国内版用户需要配置此项   |
| `SITE_NAME`       |      | 博客名称                                     |
| `SITE_URL`        |      | 博客地址                                     |

除了以上这些环境变量之外，不同的功能也会有很多环境变量配置，具体可在左侧列进度对应的功能项进行查看。

## 发布评论 Hooks

除了环境变量配置之外，Waline 还提供了一些自定义钩子，方便大家有自定义需求进行处理。目前支持发布评论前和发布评论后的钩子。只需要在服务端入口文件 `index.js` 中进行配置即可。

## preSave(comment)

传入评论数据，如果该方法返回内容，则接口会直接返回，不存储评论数据。

```js
//index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preSave(comment) {
    const isSapm = await Akismet.check(comment);
    if(isSpam) {
      return { errmsg: 'It\'s a spam!' };
    }
  }
});
```

## postSave(comment, pComment)

评论发布后执行的操作。方法执行时会传入评论数据，如果是回复评论的话还会传入父级评论。

```js

//index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preSave(comment, pComment) {
    await mailto({
      mail: pComment.mail,
      text: `${comment.nick} replied your comment!`
    });
  }
});
```