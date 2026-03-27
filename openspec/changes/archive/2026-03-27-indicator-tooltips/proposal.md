## Why

目前中东冲突和黄金趋势页面中的指标描述（如“日收益率波动率”、“20日均线”等）过于专业和官方，普通用户难以理解其具体含义和参考价值。为了降低用户的认知门槛，提升信息传达的有效性，我们需要为这些专业指标增加通俗易懂的解释说明。

## What Changes

- 引入一个通用的 Tooltip（提示框）组件，支持在指标标题旁显示一个“？”图标。
- 交互设计：在 PC 端支持鼠标悬停（Hover）展示解释文本，在移动端支持点击（Click）展示。
- 为中东冲突页面的指标（如冲突升级级别、外交进展状态、停火达成概率、地区外溢影响等）添加通俗解释。
- 为黄金趋势页面的指标（如各均线、波动率等）添加通俗解释，说明其对判断趋势的具体帮助。

## Capabilities

### New Capabilities
- `ui-tooltip`: 引入支持响应式交互（PC Hover / 移动端 Click）的通用提示框组件。

### Modified Capabilities
- `gold-trend-page`: 为黄金趋势指标添加用户友好的解释文本。
- `middle-east-conflict-page`: 为中东冲突指标添加用户友好的解释文本。

## Impact

- **UI 层**: 引入新的 Tooltip 组件（可能需要依赖 Radix UI 或类似库以保证无障碍和交互体验）。
- **组件层**: 更新 `GoldIndicatorsGrid` 和 `ConflictIndicators` 组件，将静态标题替换为带有 Tooltip 的标题。
- **用户体验**: 显著提升非专业用户对数据的理解度。