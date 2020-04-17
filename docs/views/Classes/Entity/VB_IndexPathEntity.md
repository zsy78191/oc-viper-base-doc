---
title: VB_IndexPathEntity 索引实例
date: 2020-04-17
tags:
- 功能实例
categories:
- 实例类
---

# VB_IndexPathEntity 索引实例

索引实例用于配合`VB_TableviewComponent`组件使用，为`TableView`渲染数据的承载实例。

实例字段大部分是`ViperBase`中其他工具类使用的字段，App开发时根据具体情况选择使用，更多情况下继承使用。

## 声明

```objectivec
@interface VB_IndexPathEntity : VB_Entity
```

### title

主标题，对应`UITableViewCell`的`textLabel`显示内容。

### detial

副标题，对应`UITableViewCell`的`detailTextLabel`显示内容。

### identifier

`UITableViewCell`的注册复用标记。

### icon

`UITableViewCell`的imageView中的图片名称。

### selectionStyle

`UITableViewCell`的选择风格。

### accessoryType

`UITableViewCell`的右边样式。

### presentType

用于标记次级Prensenter/ViewController的展示模式。

### data

原始数据挂载。

### childrens

子数据。