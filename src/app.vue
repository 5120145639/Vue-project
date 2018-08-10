<template>
    <div class="app-container">
        <!-- 顶部 Header 区域 -->
        <mt-header fixed title="固定在顶部"></mt-header>
        <!-- 中间的 路由 Router-view 区域 -->
		<transition>
			<router-view></router-view>
		</transition>
        <!-- 底部的 Tabbar 区域 -->
        <nav class="mui-bar mui-bar-tab">
			<!-- mui-tab-item 改名为 mui-tab-item-zqj（重新设置样式） 是为了解决mui的兼容性导致不能切换导航的错误 -->
			<router-link class="mui-tab-item-zqj" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-zqj" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-zqj" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge" id="badge">0</span>
            	</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-zqj" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

    </div>
</template>
<script>
    
</script>
<style lang="scss" scoped>
	.mint-header{
		z-index: 99;
	}
    .app-container{
        padding-top: 40px;
		padding-bottom: 50px;
		overflow-x: hidden;
    }


	.v-enter{
		opacity: 0;
		transform: translateX(100%)
	}
	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		position:absolute;
	}
	.v-enter-active,.v-leave-active{
		transition: all 0.5s ease;
	}
	//.mui-tab-item的样式
	.mui-bar-tab .mui-tab-item-zqj.mui-active {
    	color: #007aff;
	}
	.mui-bar-tab .mui-tab-item-zqj {
		display: table-cell;
		overflow: hidden;
		width: 1%;
		height: 50px;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #929292;
	}
	.mui-bar-tab .mui-tab-item-zqj .mui-icon {
		top: 3px;
		width: 24px;
		height: 24px;
		padding-top: 0;
		padding-bottom: 0;
	}
	.mui-bar-tab .mui-tab-item-zqj .mui-icon~.mui-tab-label {
		font-size: 11px;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
