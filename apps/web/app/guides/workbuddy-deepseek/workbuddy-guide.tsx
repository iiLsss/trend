"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Check,
  ChevronDown,
  Clipboard,
  Download,
  ExternalLink,
  FileJson,
  KeyRound,
  LogIn,
  MonitorCog,
  RefreshCw,
  Settings,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { GuideFaq, GuideStep } from "@/lib/portal";
import {
  legacyJsonConfig,
  modelComparison,
  officialDocLinks,
  officialScreenshots,
} from "./guide-data";

interface WorkBuddyGuideProps {
  steps: GuideStep[];
  faqs: GuideFaq[];
}

const stepIcons = {
  install: Download,
  "api-key": KeyRound,
  "model-ui": Settings,
  advanced: FileJson,
  verify: Check,
};

const faqTone = {
  red: "border-red-100 text-red-700",
  amber: "border-amber-100 text-amber-800",
  blue: "border-blue-100 text-blue-800",
};

function OfficialImage({
  title,
  caption,
  src,
}: {
  title: string;
  caption: string;
  src: string;
}) {
  return (
    <figure className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="bg-gray-50 p-3">
        <img
          src={src}
          alt={title}
          className="mx-auto max-h-[360px] w-full object-contain"
          loading="lazy"
        />
      </div>
      <figcaption className="border-t border-gray-200 p-3">
        <div className="text-sm font-bold text-gray-900">{title}</div>
        <p className="mt-1 text-xs leading-relaxed text-gray-500">{caption}</p>
      </figcaption>
    </figure>
  );
}

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 font-bold text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900"
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
}

function InstallStep() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950">
        官方 Windows 安装指南要求 Windows 10 及以上，不支持 Windows 7/8/8.1。系统不满足时客户端可能无法启动。
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {[
            "访问 Tencent WorkBuddy 官网，点击立即下载，等待安装包下载完成。",
            "双击安装包，按安装向导勾选协议、选择安装路径、确认开始菜单文件夹。",
            "建议勾选创建桌面快捷方式，再点击安装并等待完成。",
            "启动 Tencent WorkBuddy，勾选服务条款与隐私协议，使用微信扫码登录。",
            "登录后可在左下角头像入口检查更新，确保使用较新的模型配置界面。",
          ].map((item, index) => (
            <div key={item} className="flex gap-3 rounded-lg border border-gray-200 bg-white p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-900 text-xs font-bold text-gray-900">
                {index + 1}
              </span>
              <p className="text-sm leading-relaxed text-gray-700">{item}</p>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <OfficialImage {...officialScreenshots[0]} />
          <OfficialImage {...officialScreenshots[1]} />
        </div>
      </div>
      <p className="text-xs leading-relaxed text-gray-500">
        参考官方文档：
        <SourceLink href={officialDocLinks.install}>Windows 系统安装指南</SourceLink>
      </p>
    </div>
  );
}

function ApiKeyStep() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          {
            title: "创建密钥",
            text: "登录 DeepSeek 开放平台，在 API Key 或密钥管理中创建新密钥。",
          },
          {
            title: "确认额度",
            text: "保存前先确认账户余额、额度和当前服务状态，避免配置后立刻报错。",
          },
          {
            title: "安全保存",
            text: "密钥通常以 sk- 开头，只放在 WorkBuddy 设置里，不要截图或发到群聊。",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-lg border border-gray-200 bg-white p-4">
            <h4 className="mb-2 text-sm font-bold text-gray-900">{item.title}</h4>
            <p className="text-sm leading-relaxed text-gray-600">{item.text}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
        这一步不属于 WorkBuddy 官方文档，而是接入 DeepSeek 前的准备工作。DeepSeek 的价格、模型名和 Key 管理入口请以 DeepSeek 官方控制台为准。
      </div>
    </div>
  );
}

function ModelUiStep() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-gray-600">
            官方模型配置页说明，WorkBuddy 内置主流模型，也支持在设置页的模型模块通过可视化界面管理自定义模型。对小白来说，优先走 UI，不要上来就改 JSON。
          </p>
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-900">
              推荐填写顺序
            </h4>
            <ol className="space-y-3 text-sm leading-relaxed text-gray-700">
              <li>1. 打开 WorkBuddy 左下角设置入口，进入模型配置。</li>
              <li>2. 点击添加自定义模型，优先从提供商列表选择；没有 DeepSeek 时选择自定义 API / Custom。</li>
              <li>3. 填写模型名称，例如 DeepSeek Chat，并粘贴 API Key。</li>
              <li>4. 如果界面要求 URL：标准接入可先填基础地址；若界面要求完整 Endpoint，再填完整 chat completions 地址。</li>
              <li>5. 保存后回到对话入口，在模型选择器里切到自定义模型分组。</li>
            </ol>
          </div>
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950">
            官方说明：选择标准供应商时，工具调用、图片输入、推理模式等能力标记会自动填充。只有自定义服务不在列表中时，才需要手动补齐关键字段。
          </div>
        </div>
        <div className="space-y-4">
          <OfficialImage {...officialScreenshots[2]} />
          <OfficialImage {...officialScreenshots[3]} />
        </div>
      </div>
      <p className="text-xs leading-relaxed text-gray-500">
        参考官方文档：
        <SourceLink href={officialDocLinks.model}>模型配置</SourceLink>
      </p>
    </div>
  );
}

function AdvancedStep() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(legacyJsonConfig);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h4 className="mb-3 text-sm font-bold text-gray-900">自定义协议怎么理解</h4>
            <p className="text-sm leading-relaxed text-gray-600">
              官方模型配置页说明：关闭自定义协议时，WorkBuddy 会使用标准
              <code className="mx-1 rounded bg-gray-100 px-1.5 py-0.5">/chat/completions</code>
              路径并自动校验补全；开启后会直接按你填写的 URL 发起请求，适合经过网关或代理层封装的服务。
            </p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
            如果 DeepSeek 直连配置失败，先不要急着改 JSON：优先确认 URL 字段到底需要基础地址还是完整 Endpoint，再决定是否开启自定义协议。
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h4 className="mb-3 text-sm font-bold text-gray-900">旧配置文件兼容说明</h4>
            <p className="text-sm leading-relaxed text-gray-600">
              官方提到已通过
              <code className="mx-1 rounded bg-gray-100 px-1.5 py-0.5">~/.codebuddy/models.json</code>
              配置的自定义模型，在界面升级后仍可查看、编辑或删除。下面片段只作为排障参考，不作为首选教程路径。
            </p>
          </div>
        </div>
        <OfficialImage {...officialScreenshots[4]} />
      </div>

      <div className="relative rounded-lg border border-gray-800 bg-gray-950 p-4">
        <button
          type="button"
          onClick={handleCopy}
          className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded border border-gray-700 bg-gray-900 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-gray-100 transition-colors hover:bg-gray-800"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}
          {copied ? "已复制" : "复制参考片段"}
        </button>
        <pre className="overflow-x-auto pr-28 pt-8 font-mono text-xs leading-relaxed text-gray-100">
          <code>{legacyJsonConfig}</code>
        </pre>
      </div>
    </div>
  );
}

function VerifyStep() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          {
            title: "确认模型出现",
            text: "回到对话入口，打开模型选择器，找到自定义模型分组。",
          },
          {
            title: "先做简单问答",
            text: "发送一句普通问题，确认 API Key、URL 和模型名都能正常工作。",
          },
          {
            title: "再测本地任务",
            text: "让 WorkBuddy 读取一个测试文件、总结内容并输出结果。",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-lg border border-gray-200 bg-white p-4">
            <h4 className="mb-2 text-sm font-bold text-gray-900">{item.title}</h4>
            <p className="text-sm leading-relaxed text-gray-600">{item.text}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-green-100 bg-green-50 p-4 text-sm leading-relaxed text-green-900">
        推荐测试句：“读取桌面上的测试文档，总结成 5 条要点，并另存为 Markdown 文件。” 能完成读取、分析和输出，说明模型选择与本地任务能力都已经打通。
      </div>
    </div>
  );
}

function StepBody({ stepId }: { stepId: string }) {
  if (stepId === "install") return <InstallStep />;
  if (stepId === "api-key") return <ApiKeyStep />;
  if (stepId === "model-ui") return <ModelUiStep />;
  if (stepId === "advanced") return <AdvancedStep />;
  return <VerifyStep />;
}

function ScreenshotGallery() {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 md:p-8">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h2 className="serif text-3xl font-bold text-gray-900">官方截图速览</h2>
        <p className="mt-2 font-serif text-gray-600">
          下面图片来自 WorkBuddy 官方安装与模型配置文档，帮助小白对照界面位置。
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {officialScreenshots.map((shot) => (
          <OfficialImage key={shot.src} {...shot} />
        ))}
      </div>
    </section>
  );
}

export function WorkBuddyGuide({ steps, faqs }: WorkBuddyGuideProps) {
  const [activeStepId, setActiveStepId] = useState(steps[0]?.id ?? "");
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0]?.question ?? null);
  const [chartReady, setChartReady] = useState(false);

  const activeStep = useMemo(
    () => steps.find((step) => step.id === activeStepId) ?? steps[0],
    [activeStepId, steps]
  );

  useEffect(() => {
    setChartReady(true);
  }, []);

  return (
    <div className="space-y-16">
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          {
            title: "官方流程优先",
            text: "先安装登录，再到设置页模型模块添加自定义模型，避免一上来改配置文件。",
            Icon: MonitorCog,
          },
          {
            title: "DeepSeek 作为外部服务",
            text: "准备好 API Key，再按 WorkBuddy 的自定义 API 流程接入。",
            Icon: KeyRound,
          },
          {
            title: "兼容方案放后面",
            text: "自定义协议和 models.json 只用于代理网关、旧配置迁移或排障。",
            Icon: ShieldCheck,
          },
        ].map(({ title, text, Icon }) => (
          <div key={title} className="rounded-lg border border-gray-200 bg-white p-6">
            <Icon className="mb-5 h-7 w-7 text-gray-900" />
            <h3 className="serif mb-2 text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-sm leading-relaxed text-gray-600">{text}</p>
          </div>
        ))}
      </section>

      <section id="tutorial" className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
        <aside className="h-fit rounded-lg border border-gray-200 bg-gray-50 p-6 lg:sticky lg:top-8">
          <h2 className="serif mb-6 text-2xl font-bold text-gray-900">小白五步</h2>
          <div className="space-y-3">
            {steps.map((step, index) => {
              const Icon = stepIcons[step.id as keyof typeof stepIcons] ?? Sparkles;
              const isActive = activeStepId === step.id;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStepId(step.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                    isActive
                      ? "border-gray-900 bg-white text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-200 hover:bg-white"
                  )}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold">
                      {step.title.replace(/^第.步：/, "")}
                    </span>
                    <span className="mt-1 flex items-center gap-1 text-[11px] uppercase tracking-widest">
                      <Icon className="h-3 w-3" />
                      Step {index + 1}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-8 rounded-lg border border-blue-100 bg-blue-50 p-4 text-xs leading-relaxed text-blue-900">
            现在的首选路径是“设置页模型”可视化配置。JSON 片段只作为旧配置迁移或排障备份。
          </div>
        </aside>

        <div className="rounded-lg border border-gray-200 bg-white p-6 md:p-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">
            {activeStep.id}
          </p>
          <h2 className="serif mb-3 text-3xl font-bold text-gray-900">{activeStep.title}</h2>
          <p className="mb-8 font-serif leading-relaxed text-gray-600">{activeStep.description}</p>
          <StepBody stepId={activeStep.id} />
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6 md:p-8">
        <div className="mb-8 text-center">
          <h2 className="serif mb-3 text-3xl font-bold text-gray-900">
            DeepSeek API 与本地 Ollama 怎么选
          </h2>
          <p className="font-serif text-gray-600">
            WorkBuddy 官方模型配置页同时介绍了自定义 API 和 Ollama 本地部署。这里用小白视角对比取舍，分值仅作理解辅助。
          </p>
        </div>
        <div className="h-[320px] min-h-[320px] w-full">
          {chartReady ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modelComparison} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="metric" tick={{ fontSize: 12, fill: "#6b7280" }} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#6b7280" }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value, name) => [
                    `${value}%`,
                    name === "deepseekApi" ? "DeepSeek API" : "Ollama 本地",
                  ]}
                />
                <Legend />
                <Bar dataKey="deepseekApi" name="DeepSeek API" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ollamaLocal" name="Ollama 本地" fill="#0f766e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full rounded-lg border border-gray-200 bg-gray-50" />
          )}
        </div>
      </section>

      <ScreenshotGallery />

      <section id="troubleshoot">
        <div className="mb-6 border-b border-gray-200 pb-3">
          <h2 className="serif text-3xl font-bold text-gray-900">遇到麻烦？先看这里</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {faqs.map((faq) => {
            const isOpen = openFaq === faq.question;
            return (
              <button
                key={faq.question}
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : faq.question)}
                className={cn(
                  "rounded-lg border bg-white p-5 text-left transition-colors hover:border-gray-300",
                  faqTone[faq.tone]
                )}
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="text-sm font-bold">{faq.question}</span>
                  <ChevronDown
                    className={cn("h-4 w-4 shrink-0 transition-transform", isOpen && "rotate-180")}
                  />
                </span>
                {isOpen && (
                  <span className="mt-4 block text-sm leading-relaxed text-gray-600">
                    {faq.answer}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
