<!-- glance 滑动标签导航栏 -->
<template name="glance-SlideNavTabBar">
	<!-- 预留间隙 顶吸控制-->
	<view style="position: -webkit-sticky;" :style="{ top: topfixedval, position: positionS, background: bgcolor }">
		<view style="background-color: inherit;">
			<!-- 横向滚动菜单 -->
			<scroll-view class="scroll-menu" scroll-x="true" scroll-left="0" scroll-with-animation="true" :scroll-into-view="curscrollitem">
				<view class="glance-slidenav-tabbar">
					<!-- 渲染载入标签属性值 -->
					<view class="box" v-for="(items, index) in gettabbars" :key="index">
						<!-- 标签样式控制 点击事件处理  添加id 用于滚动到点击的项目-->
						<view :id="'glsntb-' + index" class="glance-slidenav-tabbar-item" :style="{ fontSize: fontsize, color: textcolor }" @click="clickitem(index, items.name)">
							<!-- 活动的标签样式控制 -->
							<view
								class="glance-slidenav-tabbar-item-text"
								:class="[index == activeitemindex ? 'glance-slidenav-tabbar-item-text-magnify' : '']"
								:style="{ color: [index == activeitemindex ? activetextcolor : textcolor] }"
							>
								{{ items.name }}
							</view>
							<!-- 下划线父标签控制 -->
							<view style="display: flex; justify-content: center; height: 10upx; min-height: 10upx; width: 100%;">
								<!-- 下划线标签样式控制 -->
								<view
									class="glance-slidenav-tabbar-itme-underline"
									:style="{ background: underlinecolor, height: underlineheight, width: underlinewidth }"
									v-if="index == activeitemindex"
								></view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'glanceSlideNavTabBar',

	props: {
		// 载入的标签数据
		data: Array,

		// 组件背景颜色
		bgcolor: {
			type: String,
			default: '#FFFFFF'
		},

		// 是否启用顶吸
		topfixed: {
			type: Boolean,
			default: false
		},

		// 距离顶部顶吸的距离
		topfixedval: {
			type: String,
			default: '0px'
		},

		// 字体大小
		fontsize: {
			type: String,
			default: '28rpx'
		},

		// 文字默认初始化颜色
		textcolor: {
			type: String,
			default: '#7d7d7d'
		},

		// 活动的项目文字颜色
		activetextcolor: {
			type: String,
			default: '#e0b87a'
		},

		// 下划线颜色
		underlinecolor: {
			type: String,
			default: '#e0b87a'
		},

		// 下划线高度
		underlineheight: {
			type: String,
			default: '8rpx'
		},

		// 下划线宽度
		underlinewidth: {
			type: String,
			default: '40%'
		}
	},

	data() {
		return {
			// 当前活动的item
			activeitemindex: getApp().globalData.activeitemindex,
			// 滚动到点击的项目位置 初始化第一个
			curscrollitem: getApp().globalData.curscrollitem,
			selfdata: [
				{
					textcontent: '', // 文字内容
					activeviewid: '' // 当前活动的子标签id
				}
			]
		};
	},

	computed: {
		gettabbars() {
			// 主组件需要:data = [{},{}]格式导入标签对象
			let tabitems = [];
			this.data &&
				this.data.forEach((item, index) => {
					tabitems.push(item);
				});
			return tabitems;
		},

		// 如果启用顶吸 则返回顶吸设置
		positionS() {
			if (this.topfixed) {
				return 'sticky';
			} else {
				return 'static';
			}
		}
	},

	methods: {
		// 点击项目事件处理
		clickitem(idx, val) {
			// 设置当前活动的项目索引值
			this.activeitemindex = idx;
			// 设置当前活动的项目位置
			idx == 0 ? (this.curscrollitem = 'glsntb-' + idx) : idx == 1 ? (this.curscrollitem = 'glsntb-' + (idx - 1)) : (this.curscrollitem = 'glsntb-' + (idx - 2));
			// 父组件通信事件
			this.$emit('clickitem', idx, val);
		},
	}
};
</script>

<style lang="scss">
.scroll-menu {
	margin-bottom: 20upx;
	padding: 0 4%;
	width: 92%;
	height: 90upx;

	.glance-slidenav-tabbar {
		display: inline-block;
		display: flex;
		z-index: 1;
		padding-top: 15upx;
		height: 60upx;
		text-align: center;

		&-item {
			height: 44upx;
			width: 138upx;
			min-height: 44upx;

			&-text {
				padding: 4upx 0;
				width: 100%;
				line-height: 44upx;
			}
		}

		.glance-slidenav-tabbar-item-text-magnify {
			-webkit-transform: scale(1);
			transform: scale(1);
		}

		.glance-slidenav-tabbar-itme-underline {
			border-radius: 10upx;
			-webkit-border-radius: 10upx;
			-moz-border-radius: 10upx;
		}
	}
}
</style>
