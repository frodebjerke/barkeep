(function (bke) {
  bke.modules.menu = {
    controller: function () {
      var links = m.prop([
        {name: m.prop("Barkeep"), url: m.prop("/")},
        {name: m.prop("New bottle"), url: m.prop("/addbottle")},
        {name: m.prop("Pour drink"), url: m.prop("/pourdrink")},
        {name: m.prop("Your profile"), url: m.prop("/userprofile")},
        {name: m.prop("Statistics"), url: m.prop("/stats")}
      ]);

      var active = m.prop(false);

      var toggleMenu =  function () {
        active(!active());
      };

      return {
        links: links,
        active: active,
        toggleMenu: toggleMenu
      };
    },
    view: function (ctrl) {
      return m(".el-menu", {
        class: ctrl.active() ? "active" : ""
      },[
        m("a.menu-icon", {
          onclick: ctrl.toggleMenu
        },"m"),
        m(".menu-list.col-xs-12",
          ctrl.links().map(this.menuItem)
        )
      ]);
    },
    menuItem: function (item) {
      return m("a.menu-item", {
          href: '/#'+ item.url()
        }, item.name());
    }
  };
})(window.bke = window.bke || {});
