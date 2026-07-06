import type { GuideFaq, GuideStep } from "@/lib/portal";

export interface OfficialScreenshot {
  title: string;
  caption: string;
  src: string;
  source: "Windows 安装指南" | "模型配置";
}

const imageBase = "/guides/workbuddy-deepseek";

export const officialDocLinks = {
  install:
    "https://www.workbuddy.ai/docs/zh/workbuddy/From-Beginner-to-Expert-Guide/Installation-Win-Guide",
  model:
    "https://www.workbuddy.ai/docs/zh/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Model",
};

export const guideSteps: GuideStep[] = [
  {
    id: "install",
    title: "第一步：安装并登录 WorkBuddy",
    description:
      "先确认系统环境、下载客户端、完成安装向导和微信扫码登录。官方 Windows 指南要求 Windows 10 及以上。",
    content:
      "访问 Tencent WorkBuddy 官网下载安装包，按安装向导完成协议、路径、快捷方式和安装确认，启动后勾选条款并用微信扫码登录。",
  },
  {
    id: "api-key",
    title: "第二步：准备 DeepSeek API Key",
    description:
      "DeepSeek 作为外部模型服务时，需要先准备 API Key。后续在 WorkBuddy 模型配置里只粘贴密钥，不要把密钥发给别人。",
    content:
      "登录 DeepSeek 开放平台，创建 API Key，并确认账户额度可用。密钥通常以 sk- 开头。",
  },
  {
    id: "model-ui",
    title: "第三步：在设置页添加自定义模型",
    description:
      "官方模型配置页强调：自定义模型可以通过可视化界面添加、编辑和删除，一般不需要手动编辑配置文件。",
    content:
      "进入设置页的模型配置，选择提供商或自定义 API，填写 URL、模型名和 API Key。标准供应商会自动写入工具调用、图片输入等能力标记。",
  },
  {
    id: "advanced",
    title: "第四步：处理接口路径与兼容配置",
    description:
      "如果模型服务经过网关或代理，或者使用非标准 URL 路径，再考虑自定义协议和配置文件兼容方案。",
    content:
      "默认关闭自定义协议时，WorkBuddy 会使用标准 /chat/completions 路径并自动校验补全；开启后会直接按你填写的 URL 请求。",
  },
  {
    id: "verify",
    title: "第五步：验证模型与本地任务",
    description:
      "保存后回到对话入口，选择刚添加的自定义模型，先做简单问答，再验证文件读取、文档生成和数据分析。",
    content:
      "从低风险测试开始：问候、总结文本、读取测试文件。确认模型选择器能看到自定义模型后，再做复杂任务。",
  },
];

export const guideFaqs: GuideFaq[] = [
  {
    question: "我还需要手动改 models.json 吗？",
    answer:
      "通常不需要。官方模型配置页说明，自定义模型支持在设置页通过图形界面添加、编辑和删除。旧的 ~/.codebuddy/models.json 配置可继续被界面识别，用于兼容或排障即可。",
    tone: "blue",
  },
  {
    question: "DeepSeek 应该填 Base URL 还是完整接口地址？",
    answer:
      "优先按 WorkBuddy 当前界面字段提示填写。如果是标准 OpenAI-compatible 接入，通常填服务基础地址即可；如果你经过代理网关且必须写完整路径，再开启自定义协议并填写完整 URL。",
    tone: "amber",
  },
  {
    question: "报 401 身份验证错误怎么办？",
    answer:
      "检查 API Key 是否复制完整、是否多了空格、是否错误包含 Bearer 前缀，以及 DeepSeek 账户余额或额度是否可用。改完后重新保存模型配置再测试。",
    tone: "red",
  },
  {
    question: "模型保存了，但对话里找不到？",
    answer:
      "官方说明对话入口会展示自定义模型分组，并支持跳转回配置界面编辑。若没出现，先确认模型已保存成功，再重启 WorkBuddy 或检查账号/版本是否支持该能力。",
    tone: "amber",
  },
];

export const officialScreenshots: OfficialScreenshot[] = [
  {
    title: "下载入口",
    caption: "官方 Windows 安装指南：访问官网并点击立即下载。",
    src: `${imageBase}/download.png`,
    source: "Windows 安装指南",
  },
  {
    title: "登录 WorkBuddy",
    caption: "启动客户端后点击登录，再勾选条款并用微信扫码。",
    src: `${imageBase}/login.png`,
    source: "Windows 安装指南",
  },
  {
    title: "设置页模型",
    caption: "官方模型配置页：在设置页的模型模块管理自定义模型。",
    src: `${imageBase}/model-settings.png`,
    source: "模型配置",
  },
  {
    title: "自定义 API",
    caption: "选择自定义 API 或预设提供商后，再填写密钥和模型信息。",
    src: `${imageBase}/custom-api.png`,
    source: "模型配置",
  },
  {
    title: "自定义模型",
    caption: "当服务不在提供商列表中，可选择 Custom 手动填写 URL、API Key 与模型名。",
    src: `${imageBase}/custom-model.png`,
    source: "模型配置",
  },
];

export const modelComparison = [
  {
    metric: "上手速度",
    deepseekApi: 90,
    ollamaLocal: 55,
  },
  {
    metric: "隐私控制",
    deepseekApi: 55,
    ollamaLocal: 95,
  },
  {
    metric: "硬件要求",
    deepseekApi: 95,
    ollamaLocal: 45,
  },
  {
    metric: "离线可用",
    deepseekApi: 20,
    ollamaLocal: 95,
  },
];

export const legacyJsonConfig = `{
  "models": [
    {
      "id": "deepseek-chat",
      "name": "DeepSeek Chat",
      "vendor": "Custom",
      "url": "https://api.deepseek.com/v1/chat/completions",
      "apiKey": "sk-这里替换成你的密钥",
      "supportsToolCall": true
    }
  ],
  "availableModels": ["deepseek-chat"]
}`;
