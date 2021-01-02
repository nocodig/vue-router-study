let _Vue = null;

export default class VueRouter {
  /**
   * 注册VueRouter插件，当执行Vue.use时执行
   * @param {*} Vue Vue
   */
  static install(Vue) {
    // 1、判断当前插件是否被安装
    if (VueRouter.install.installed) {
      return;
    }

    VueRouter.install.installed = true;
    // 2、把vue构造函数记录到全局变量
    _Vue = Vue;
    // 3、把创建Vue实例时，传入的router对象注入到vue实例上
    // 全局混入方式，注入router对象
    _Vue.mixin({
      beforeCreate() {
        // 组件不用挂载router，且组件中没有router属性，限制组件中
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router;
          this.$options.router.init();
        }
      }
    })
  }

  /**
   * 构造函数，初始化三个属性
   * @param {*} options 
   */
  constructor(options) {
    this.options = options;
    this.routeMap = new Map();
    this.data = _Vue.observable({ curret: '/' });
  }

  init() {
    this.createRouteMap();
    this.initComponents(_Vue);
    this.initEvent();
  }

  /**
   * 将传入的路由规则转化成键值对形式存入routeMap中
   */
  createRouteMap() {
    this.options.routes.forEach(route => {
      this.routeMap.set(route.path, route.component);
    })
  }

  initComponents(Vue) {
    const _this = this;
  
    Vue.component('router-link', {
      props: {
        to: String,
      },
      // template: '<a :href="to"><slot></slot></a>' 完整版本写法
      render(h) {
        return h('a', {
          attrs: {
            href: this.to,
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default]) // 默认插槽
      },
      methods: {
        clickHandler(e) {
          history.pushState({}, '', this.to);
          this.$router.data.curret = this.to;
          e.preventDefault();
        }
      }
    });

    Vue.component('router-view', {
      render(h) {
        // 增加转化成动态路由的元地址
        const component = _this.routeMap.get(_this.data.curret);
        return h(component);
      }
    })
  }

  initEvent() {
    window.addEventListener('popstate', () => {
      this.data.curret = window.location.pathname;
    })
  }
}
