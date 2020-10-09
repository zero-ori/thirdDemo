import { http, delayIt, useMock } from './base';
import { IRC } from './constant';

export function getUserList({ page = 1, pageSize = 10, databaseId, classId, institutionId, keyName} = {}) {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    const total = 34;
    const count = page * pageSize <= total ? pageSize : total % pageSize;
    const title = [
      {
        title: '用户ID',
        dataIndex: 'id',
      },
      {
        title: '登录账号',
        dataIndex: 'name',
      },
      {
        title: '用户姓名',
        dataIndex: 'realName',
      },
      {
        title: '所属机构',
        dataIndex: 'institutionName',
      },
      {
        title: '所属部门',
        dataIndex: 'className',
      },
      {
        title: '所属数据库',
        dataIndex: 'source_name',
      },
      {
        title: '用户角色',
        dataIndex: 'roleName',
      },
      {
        title: '科室',
        dataIndex: 'department',
      },
    ];

    const data = {
      count: total,
      data: Array(count).fill().map(function () {
        return arguments[1];
      }).map(num => {
        const o = {};
        title.forEach(d => {
          o[d.dataIndex] = d.title + `${page}${num}`;
          num === 1 ? o.sourceInfo = [] : o['sourceInfo'] = [
            {
              "sourceId": "1",
              "source_name": `name${page}${num}0`,
              "roleName": `12${page}${num}1`,
              "roleId": "1",
              "department": "test1,test2"
            },
            {
              "sourceId": "2",
              "source_name": `name${page}${num}0`,
              "roleName": `12${page}${num}1`,
              "roleId": "1",
              "department": "test1,test2"
            },
          ];
        });

        return {
          id: `${page}${num}`,
          ...o,
        };
      }),
    }
    return delayIt(() => {
      return data;
    })
  }

  const params = {
    page, pageSize, databaseId, classId, institutionId, keyName
  }

  return http.post(`${IRC}/users/list`, params);
}

export function getInstituion() {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return [{ "id": "hosp_96", "name": "测试医院", "classes": [{ "id": "hosp_79", "name": "胸外科A区" }, { "id": "hosp_80", "name": "放疗科一病区" }] }]
    })
  }
  // 根据用户所拥有的数据库权限去获取机构/部门列表
  return http.get(`${IRC}/institution/permission/list`);
}

export function resetPassword(id) {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return {

      }
    })
  }

  return http.put(`${IRC}/users/resetPassword/${id}`);
}

export function operateUser({ id, name, realName, mobile, classId, institutionId, titleId, } = {}) {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return {

      }
    })
  }

  const params = { id, name, realName, mobile, classId, institutionId, titleId };

  return http.post(`${IRC}/users/${id !== undefined ? 'updateUser' : 'addUser'}`, params);
}

export function getTitles() {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return {

      }
    })
  }

  return http.get(`${IRC}/titles`);
}

export function isSuperAdmin() {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return true;
    })
  }

  return http.get(`${IRC}/api/users/isSuperAdmin`);
}

export function getDatabaseList() {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return []
    })
  }
  return http.get(`${IRC}/api/institution/listDB`)
}