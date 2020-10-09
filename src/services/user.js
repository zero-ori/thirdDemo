import { IRC } from './constant';
import { plainHttp, http, delayIt, useMock } from './base';

export function modifyPassword(params) {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return [];
    })
  }
  
  return http.put(`${IRC}/users/modifyPassword`, params);
}

// 退出登陆
export function logout() {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return [];
    })
  }
  return http.get(`${IRC}/users/logout`);
}

// 获得菜单
export function getMenus(search) {
  // todo
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      const data = [
        {
          'name': '数据库管理',
          'icon': 'IcDatabase',
          'href': '/admin/#/database/list',
          'link': 0,
          'type': 'admin',
          'children': [],
          'search': '',
          'key': 'database.list'
        },
        {
          'name': '模型管理',
          'icon': 'IcModel',
          'href': '/admin/#/model/list',
          'link': 0,
          'type': 'admin',
          'children': [],
          'search': '',
          'key': 'model.list'
        },
        {
          'name': '角色管理',
          'icon': 'IcRole',
          'href': null,
          'link': 0,
          'type': 'admin',
          'search': '',
          'key': 'role.manage',
          'children': [
            {
              'name': '临床数据管理中心',
              'icon': null,
              'href': '/admin/?source=rdr&type=rdr#/roles/rdr',
              'link': 0,
              'type': 'admin',
              'children': [],
              'search': '?source=rdr&type=rdr',
              'key': 'role.rdr',
            },
            {
              'name': '专病库',
              'icon': null,
              'href': '/admin/#/roles/dsd',
              'link': 0,
              'type': 'admin',
              'children': [],
              'search': '',
              'key': 'role.dsd',
            },
            {
              'name': '多中心',
              'icon': null,
              'href': '/admin/#/roles/nmo',
              'link': 0,
              'type': 'admin',
              'children': [],
              'search': '',
              'key': 'role.nmo',
            },
          ]
        },
        {
          'name': '后台角色管理',
          'icon': 'IcBackendRole', //<a-icon type="idcard" />
          'href': null,
          'link': 0,
          'type': 'admin',
          'search': '',
          'key': 'backendRoleManage.manage',
          'children': [
            {
              'name': '数据库管理',
              'icon': null,
              'href': '/admin/?source=agency_source_db_admin&type=agency_source_db_admin#/backendRoleManage/db',
              'link': 0,
              'type': 'admin',
              'children': [],
              'search': '?type=agency_source_db_admin',
              'key': 'backendRoleManage.db',
            },
            
            {
              'name': '模型管理',
              'icon': null,
              'href': '/admin/?source=admin&type=admin#/backendRoleManage/model',
              'link': 0,
              'type': 'admin',
              'children': [],
              'search': '?source=admin&type=admin',
              'key': 'backendRoleManage.model',
            }
          ]
        },
        {
          'name': '用户管理',
          'icon': 'IcUserManage',
          'href': '/admin/#/users/list',
          'link': 0,
          'type': 'admin',
          'children': [],
          'search': '',
          'key': 'users.list'
        },
        {
          'name': '浏览记录',
          'icon': 'icon-ic-user-o',
          'href': '/admin/#/history/browsing',
          'link': 0,
          'type': 'admin',
          'children': [],
          'search': '',
          'key': 'browsing.list'
        },
        {
          'name': '导出记录',
          'icon': 'icon-ic-list-o',
          'href': '/admin/#/history/export',
          'link': 0,
          'type': 'admin',
          'children': [],
          'search': '',
          'key': 'export.list'
        },
        {
          'name': '个人中心',
          'icon': 'IcUserManage',
          'href': null,
          'link': 0,
          'type': 'admin',
          'search': '?source=rdr&type=rdr',
          'key': 'personal.center',
          'children': [
            {
              'name': '我的导出',
              'icon': null,
              'href': '/admin/?source=rdr&type=rdr#/center/export',
              'link': false,
              'type': 'admin',
              'children': null,
              'search': '?source=rdr&type=rdr',
              'key': 'myExport.list',
            },
            {
              'name': '我的审批',
              'icon': null,
              'href': '/admin/?source=kanghong&type=dsd#/center/approve',
              'link': false,
              'type': 'admin',
              'children': null,
              'search': '?source=rdr&type=rdr',
              'key': 'approve.list',
            }
          ]
        },
      ];

      return data;
    })
  }

  console.log('search', search);

  return http.get(`/imenu/menus${search}`);
}

// 获得菜单
export function getPersonalMenus() {
  // todo
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      const data = [
        {
          "name": "个人中心",
          "icon": "icon-user",
          "href": null,
          "link": 0,
          "key": 'personal.center',
          "children": [
            {
              "name": "我的导出",
              "icon": null,
              "href": "/admin/?source=rdr&type=rdr#/center/export",
              "type": "admin",
              "link": 0,
              "children": [],
              "search": "?source=rdr&type=rdr",
              "key": "myExport.list"
            },
            {
              "name": "我的审批",
              "icon": null,
              "href": "/ihubble/userCenter/index?page=daochurenwuliebiao&directorOrUser=director#/dataExportTask",
              "type": "admin",
              "link": 0,
              "children": [],
              "search": "?source=rdr&type=rdr",
              "key": "approve.list"
            }
          ]
        },
      ];

      return data;
    })
  }

  return http.get(`/imenu/personCenter`);
}

// 判断登陆
export function checkLogin(params) {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return {
        code: 200,
        message: 'success',
      };
    })
  }
  return plainHttp.post(`${IRC}/users/check`, params);
}