<template>
	<view>
		<view class="wrap">
			<!-- 评论区 start -->
			<view class="comment">
				<view class="list">
					<view class="face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
					<view class="body">
						<view class="top"><text>网友</text></view>
						<view class="date"><text>08/10 08:12</text></view>
						<view class="content">很酷的HBuilderX和app，开发一次既能生成小程序，又能生成App</view>
					</view>
				</view>
				<view class="list">
					<view class="face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
					<view class="body">
						<view class="top"><text>马克一天</text></view>
						<view class="content">很强大，厉害了我的app!</view>
					</view>
				</view>
				<view class="list">
					<view class="face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
					<view class="body">
						<view class="top"><text>今生缘</text></view>
						<view class="content">好牛逼的感觉，是不是小程序、App、移动端都互通了？</view>
						<view class="date"><text>08/10 07:55</text></view>
					</view>
				</view>
				<view class="list">
					<view class="face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
					<view class="body">
						<view class="top"><text>小猫咪</text></view>
						<view class="content">支持国产，支持DCloud!</view>
						<view class="date">
							<view>2天前</view>
							<view class="replay-btn">5回复</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '评论界面'
		};
	}
};
</script>

<style lang="scss">
/* comment */
page {
	background-color: #f8f8f8;
}

view {
	font-size: 28upx;
}

.wrap {
	padding: 30upx;
}

.comment {
	padding: 5rpx 0;
	display: flex;
	flex-grow: 1;
	flex-direction: column;
}

.list {
	flex-wrap: nowrap;
	padding: 10rpx 0;
	margin: 10rpx 0;
	width: 100%;
	display: flex;
}

.face {
	width: 70upx;
	height: 70upx;
	border-radius: 100%;
	margin-right: 20upx;
	flex-shrink: 0;
	overflow: hidden;
}

.face image {
	width: 100%;
	border-radius: 100%;
}

.body {
	width: 100%;
}

.top {
	line-height: 1.5em;
	justify-content: space-between;
}

.top text {
	color: #0a98d5;
	font-size: 24upx;
}

.date {
	line-height: 38upx;
	flex-direction: row;
	justify-content: space-between;
	display: flex !important;
	flex-grow: 1;
}

.date view {
	color: #666666;
	font-size: 24upx;
	line-height: 38upx;
}

.content {
	line-height: 1.6em;
	font-size: 28upx;
	padding: 8rpx 0;
}

.replay-btn {
	background: #fff;
	font-size: 24upx;
	line-height: 28upx;
	padding: 5rpx 20upx;
	border-radius: 30upx;
	color: #333 !important;
	margin: 0 10upx;
}
</style>
