---
layout: post
title: "vpalmobile api"
description: ""
category: 
tags: []
---
{% include JB/setup %}

## 概述

vpalmobileui 是以H5收银台为基础开发的一套微型H5前端UI组件库，目前包括的组件有：字体、标题、脚手架、banner、按钮、checkbox、文本输入框、列表、tab页、弹窗。组件在不断完善中……

## 兼容性

	Safari 6+ (Mac)
	Chrome 30+ (Windows, Mac, Android, iOS, Linux, Chrome OS)
	Firefox 24+ (Windows, Mac, Android, Linux, Firefox OS)
	iOS 5+ Safari
	Android 2.3+ Browser
	Internet Explorer 10+ (Windows, Windows Phone)
	UC手机浏览器
	QQ手机浏览器

## UI效果

地址：[http://wikieswan.github.io/vpalmobileui/](http://wikieswan.github.io/vpalmobileui/)

## API

### 脚手架

脚手架的结构如下：

	<div class="container">
		<div class="row">
			<div class="col">
				
			</div></div>
	</div>


```<div class="container">``` 为最外层容器；

```<div class="row">``` 为行级；

```<div class="col">``` 为列级。

```<div class="row">``` 的宽度是整个屏幕宽度的100%；对于不需要满屏的行，可以使用 ```<div class="row row-padding">``` ，这样横向会有 1rem 的空余。如果这种padding不能满足需求，可以自定义横向padding数值。

```<div class="col">``` 默认宽度是 100% ；为了适应各种宽度需求，提供了各种百分比宽度的 col ：

	col-10
	col-20
	col-25
	col-30
	col-33
	col-40
	col-50
	col-60
	col-67
	col-70
	col-75
	col-80
	col-90

用法：

	<div class="row">
		<div class="col col-10"></div>
		<div class="col col-10"></div>
		<div class="col col-10"></div>
		<div class="col col-10"></div>
		<div class="col col-10"></div>
		<div class="col col-10"></div>
		<div class="col col-10"></div>
		<div class="col col-10"></div>
		<div class="col col-10"></div>
		<div class="col col-10"></div>
	</div>

脚手架目的是为了适应各种形式的布局。



### banner

banner 的作用是用来展示必要的通知信息。

	<!-- banner -->
	<div class="row demo-pading-top">
		<div class="col">
			<div class="banner">这是一个默认的 banner 条</div>
		</div>
	</div>

	<div class="row row-padding demo-pading-top">
		<div class="col">
			<div class="banner">这是一个 带横向 padding banner 条</div>
		</div>
	</div>

### 页面头部

页面的头部，包括标题、返回、操作等区域

基本用法：

	<div class="head">
		<span class="h1">这是标题</span>
	</div>

完整用法：

	<div class="head">
		<a class="left-option back"  href="javascript:window.history.back();">
			<i class="icon-chevron icon-chevron-left"></i>
		</a>
		<span class="h1">快捷支付</span>
		<a class="right-option close">关闭</a>
	</div>

.left-option .right-option 会在头部左右两侧分别预留出来一块区域，用来做其他业务。

```<span class="h1">快捷支付</span>``` 头部显示的文本， .h1 .h2分别用作大小标题；这里用户可以自己定义文本大小。


### 按钮

按钮可以用 button 和 a 标签，样式用 .btn

	<button class="btn btn-default">这是个按钮 btn-default</button>

	<button class="btn btn-red">这是个按钮 btn-red</button>
	
	<button class="btn btn-disabled">这是个按钮 btn-disabled</button>

.btn 有3个样式： .btn-default .btn-red .btn-disabled 

.btn 的宽度是父级宽度的100%；所以可以通过控制父级的宽度来设置btn的宽度。


ps：以下是vpalmobileui JavaScript组件，需要引入vpal.ui.js 文件，它依赖zepto.js\zepto.fx.js、zepto.touch.js;

### checkbox 

checkbox 有3种状态，分别是默认、选中、不可用；对应的样式分别是：.checkkbox-default .checkkbox-selected .checkkbox-disabled

在 .checkbox 加上 ```role="checkbox"``` 属性，可以自动响应用户touch；

	<div class="row row-padding">
		<div class="col">
			<div class="checkbox checkkbox-selected" role="checkbox">
				<i class="icon-tick"></i>
			</div>
			<lable>这是个checkbox</lable>
		</div>
	</div>

checkbox 对外提供3个js接口：

+ $.checkbox.get(selector)

获取某个.checkbox的值，返回true或者false

+ $.checkbox.set(selector,value)

设置某个.checkbox的值，value是true或者false

+ $.checkbox.toggle(selector)

切换某个.checkbox


































