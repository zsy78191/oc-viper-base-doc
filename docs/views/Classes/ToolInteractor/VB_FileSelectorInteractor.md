---
title: VB_FileSelectorInteractor iCloud文件选择器
date: 2020-04-17
tags:
- 组件
- 文件
- iCloud
categories:
- 工具类
- Interactor封装
---

# VB_FileSelectorInteractor iCloud文件选择器

`VB_FileSelectorInteractor`是一个派生于`VB_Interactor`的工具类，对Cocoa框架的`UIDocumentPickerViewController`类进行了封装，用与选择iCloud中存储的文件。

## 声明

``` objectivec
@interface VB_FileSelectorInteractor : VB_Interactor
```
### 引用类

|类名|描述|参考|
|---|---|---|
|AnyPromise|第三方框架类，用于事件流控制|[PromiseKit](../../3rd/PromiseKit/PromiseKit.md)|

### - selectFileWithUTIs:

通过传入UTI数组，标记可选文件类型，UTI可用值参考[Apple官方文档](https://developer.apple.com/library/archive/documentation/Miscellaneous/Reference/UTIRef/Articles/System-DeclaredUniformTypeIdentifiers.html#//apple_ref/doc/uid/TP40009259)。

### - selectFileWithUTIs: viewController:

功能与`- selectFileWithUTIs:`相同，用在非`ViperBase`环境中。

## 使用方法

### 初始化

`ViperBase`环境中，需要设置`parentInteractor`，这样就可以直接使用`selectFileWithUTIs:`启动。

在非`ViperBase`环境中，可以不设置`parentInteractor`，启动时候要指定`UIViewController`。

``` objectivec
VB_FileSelectorInteractor* fileSelector = [[VB_FileSelectorInteractor alloc] init];
fileSelector.parentInteractor = self; // 这里self本身是VB_Interactor，如果不设置无法关联Presenter
```

### 启动并获取选择文件

``` objectivec
  // 选择字体文件
 [fileSelector selectFileWithUTIs:@[@"public.font"]]
    .then(^(NSString* file){
    // 获取文件路径
 });
```