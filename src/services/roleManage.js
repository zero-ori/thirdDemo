import { http, delayIt, useMock } from './base'
import { IRC } from './constant'

const CREATE_BACK_ROLE_CONFIG = [
  {
    label: '数据库管理权限',
    type: 'selectGroup',
    placeholder: '请选择',
    required: false,
    allowClear: true,
    mode: 'tags',
    options: [],
    key: 'source',
    validateOptions: {},
    disabled: false
  },
  {
    label: '模型管理权限',
    type: 'selectGroup',
    placeholder: '请选择',
    required: false,
    allowClear: true,
    mode: 'tags',
    options: [],
    key: 'model',
    validateOptions: {},
    disabled: false
  }
]

export function getRolesBySourceType (sourceType = '') {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      if (sourceType === 'nmo') {
        return [
          {
            id: 4,
            name: '管理人员-nmo',
            permissions: [
              {type: "nmo.record.create", value: "数据录入"},
              {type: "nmo.record.search", value: "患者检索"},
            ],
            sourceType: 'nmo',
            createdAt: '2019-10-12 12:33',
            createdById: 100,
            createdByName: 'NMO-1',
            updatedAt: '2019-10-12 12:33',
            updatedById: 100,
            updatedByName: 'NMO-1'
          },
        ]
      }
      return [
          {
            id: 5,
            name: '管理人员',
            permissions: [
              {type: "dsd.record.create", value: "数据录入"},
              {type: "dsd.record.search", value: "患者检索"},
            ],
            sourceType: 'dsd',
            createdAt: '2019-10-12 12:33',
            createdById: 100,
            createdByName: '王友文',
            updatedAt: '2019-10-12 12:33',
            updatedById: 100,
            updatedByName: '王友文'
          },
          {
            id: 6,
            name: "运营人员",
            permissions: [{type: "dsd.record.search", value: "患者检索"}, {type: "dsd.record.export", value: "数据导出"}],
            sourceType: "dsd",
            createdAt: "2020-03-16 11:56:37",
            createdById: 1,
            createdByName: "管理员",
            updatedAt: "2020-03-16 11:56:37",
            updatedById: 1,
            updatedByName: "管理员"
          }
        ];
    })
  }
  return http.get(`${IRC}/api/roles/v2/getRolesBySourceType`, {
    params: {
    sourceType}
  })
}

function createRoleUsersTable (data) {
  const title = [
    { key: 'userId', dataIndex: 'userId', title: '用户ID' },
    { key: 'userName', dataIndex: 'userName', title: '用户姓名' },
    { key: 'institutionName', dataIndex: 'institutionName', title: '所属机构' },
    { key: 'mobile', dataIndex: 'mobile', title: '手机号' },
    { key: 'className', dataIndex: 'className', title: '所属部门' },
    // { key: 'departmentsText', dataIndex: 'departmentsText', title: '查看科室' },
    { key: 'action', title: '操作', scopedSlots: { customRender: 'action' } }
  ]
  let count = 0
  if (data && data.length) {
    count = data.length
  }
  if (data instanceof Array) {
    data.forEach(item => {
      if (!item.departmentsText && item.departments instanceof Array) {
        const departmentsList = []
        item.departments.forEach(obj => {
          departmentsList.push(obj.departmentName)
        })
        item.departmentsText = departmentsList.join(' | ')
      }
    })
  }
  return {
    count,
    title,
    data,
  }
}

export function getRoleUsers({ source = '', roleId = 0, classId = undefined, keyName = undefined, page = 1, pageSiz = 10} = {}) {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    let list = [
      {
        roleId: 1,
        id: 100,
        userName: '侯建国',
        institutionId: 'hosp_100',
        institutionName: '河肿',
        classId: 'hosp_123',
        className: '心内科',
        departments: [{
          departmentId: 100,
          departmentName: 'xx1科'
        },
          {
            departmentId: 101,
            departmentName: 'xx2科'
          }]
      }
    ];
    if (source === '') {
      list = [];
    } else if (source === 'nmo') {
      list = [
        {
          roleId: 1,
          id: 100,
          userName: 'nmo-1',
          institutionId: 'hosp_100',
          institutionName: '河肿',
          classId: 'hosp_123',
          className: '心内科',
          departments: [{
            departmentId: 100,
            departmentName: 'xx1科'
          },
            {
              departmentId: 101,
              departmentName: 'xx2科'
            }]
        },
        {
          roleId: 2,
          id: 101,
          userName: 'Test-nmo',
          institutionId: 'hosp_100',
          institutionName: '河肿',
          classId: 'hosp_123',
          className: '心内科',
          departments: [{
            departmentId: 100,
            departmentName: 'xx1科'
          },
            {
              departmentId: 101,
              departmentName: 'xx2科'
            }]
        }
      ];
    } else if (source === 'dsd') {
      list = [
        {
          roleId: 1,
          id: 100,
          userName: 'DSD-test',
          institutionId: 'hosp_100',
          institutionName: '河肿xx',
          classId: 'hosp_123',
          className: '心内科-test',
          phoneNumber: 12343211234,
          departments: [{
            departmentId: 100,
            departmentName: 'xx1科'
          },
            {
              departmentId: 101,
              departmentName: 'xx2科'
            }]
        }
      ];
    } else if (source === 'data_platform_backend') {
      list = [];
    }
    
    return delayIt(() => {
      return createRoleUsersTable(list)
    })
  }
  return http.get(`${IRC}/api/userRole/v2/getRoleUsers`, {
    params: {
      source,
      roleId,
      classId,
      page,
      pageSiz,
      keyName
    }
  }).then(res => {
    res = createRoleUsersTable(res)
    return res
  })
}

export function getUserByCond (params) {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    const list = [
      {
        roleId: 1,
        id: 100,
        userName: '侯建国',
        institutionId: 'hosp_100',
        institutionName: '河肿',
        classId: 'hosp_123',
        className: '心内科',
        departments: [{
          departmentId: 100,
          departmentName: 'xx1科'
        },
          {
            departmentId: 101,
            departmentName: 'xx2科'
          }]
      }
    ]
    return delayIt(() => {
      return createRoleUsersTable(list)
    })
  }

  return http.get(`${IRC}/api/institution/getUserByCond`, { params}).then(res => {
    res = createRoleUsersTable(res)
    return res
  })
}

export function updateRoleUsers (source = '' , roleId = 0 , userIds = []) {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return undefined
    })
  }
  return http.post(`${IRC}/api/userRole/v2/updateRoleUsers`, {
    source,
    roleId,
  userIds})
}

export function deleteRoleUser (userRoleId = '') {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return undefined
    })
  }
  return http.post(`${IRC}/api/userRole/v2/deleteRoleUser`, { userRoleId})
}

function createConfig (list) {
  const result = []
  if (list instanceof Object) {
    Object.keys(list).forEach((key, index) => {
      const options = []
      if (list[key] && list[key] instanceof Array) {
        list[key].forEach(option => {
          options.push({
            title: option.title,
            value: option.slug
          })
        })
      }
      result.push({
        label: key,
        type: 'checkbox',
        required: false,
        options,
        span: 12,
        key: `permissions${index}`,
        validateOptions: {},
        disabled: false
      })
    })
  }
  return result
}

export function getRoleConfig (sourceType) {
  const commonConfig = [
    {
      label: '角色名',
      type: 'text',
      placeholder: '请输入角色名',
      required: true,
      allowClear: true,
      key: 'name',
      validateOptions: {
        rules: [
          {
            required: true,
            message: '请输入角色名'
          }
        ]
      },
      disabled: false
    }
  ]
  return getPermissionConfig(sourceType).then(res => {
    if (sourceType === 'data_platform_backend') {
      return groupModelByType().then(source => {
        return groupSourceByType().then(res => {
          CREATE_BACK_ROLE_CONFIG.forEach(item => {
            if (item.key === 'model') {
              item.options = source.sourceList;
            }
            if (item.key === 'source') {
              item.options = res;
            }
          })
          return commonConfig.concat(CREATE_BACK_ROLE_CONFIG)
        })
      })
    } else {
      return commonConfig.concat(createConfig(res))
    }
  })
}

export function createRole (params) {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return '创建角色成功'
    })
  }
  return http.post(`${IRC}/userRole/v2/createRole`, params)
}

export function updateRole (params) {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return '编辑角色成功'
    })
  }
  return http.post(`${IRC}/userRole/v2/updateRole`, params)
}

export function deleteRole (roleId) {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return '删除角色成功'
    })
  }
  return http.post(`${IRC}/userRole/v2/deleteRole`, {
  roleId})
}

export function getPermissionConfig (sourceType) {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return {
        图表权限: [
          {
            title: '疾病深度分析',
            slug: 'dsd.reporter'
          }
        ],
        数据管理: [
          {
            title: '数据录入',
            slug: 'dsd.record.create'
          }
        ],
        科研探索: [
          {
            title: '患者检索',
            slug: 'dsd.record.search'
          },
          {
            title: '数据导出',
            slug: 'dsd.record.export'
          },
          {
            title: '课题探索',
            slug: 'dsd.my.topic'
          }
        ],
        平台管理: [
          {
            title: '导出审批管理',
            slug: 'dsd.export.manage'
          }
        ]
      }
    })
  }
  return http.get(`${IRC}/api/permissionConfig/v2/get`, {
    params: {
    sourceType}
  })
}

export function getUserModels () {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return []
    })
  }

  return http.get(`${IRC}/api/userPermission/v2/getUserModels`)
}

export function updateUserDepartments (userRoleId = 0 , departmentIds = []) {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return undefined
    })
  }
  return http.post(`${IRC}/api/userRole/v2/updateUserDepartments`, {
    userRoleId,
  departmentIds})
}

export function getDeptListBySource (source) {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return {
        hospitalId: '1',
        hospitalName: '天津市胸科医院',
        departments: [
          {departmentName: '胸外科', departmentId: '1'},
          {departmentName: '4', departmentId: '303'},
          {departmentName: '测试', departmentId: '376'},
          {departmentName: 'linklab_其他科室', departmentId: '468'},
          {departmentName: '呼吸与危重症科', departmentId: '649'},
          {departmentName: '心内三科', departmentId: '748'},
          {departmentName: '1', departmentId: '4573'},
          {departmentName: '111', departmentId: '4574'},
          {departmentName: '测试', departmentId: '4577'},
          {departmentName: '11', departmentId: '4585'},
          {departmentName: '11111', departmentId: '4586'},
          {departmentName: 'edc_研究感冒', departmentId: '5801'},
          {departmentName: '5555', departmentId: '8067'},
          {departmentName: '666', departmentId: '8070'},
          {departmentName: '胸外科23', departmentId: '8075'},
          {departmentName: '嘎嘎嘎', departmentId: '8078'},
          {departmentName: '问问', departmentId: '8095'},
          {departmentName: 'ff', departmentId: '8118'},
          {departmentName: '测试胸科', departmentId: '8142'},
          {departmentName: '123', departmentId: '8167'},
        ],
      };
    });
  }
  return http.get(`${IRC}/api/institution/getDeptListBySource`, {
    params: {
    source}
  })
}

export function getUserAdminInfo () {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return {
        isSuperAdmin: true,
        isAnySourceAdmin: true,
        isAnyModelAdmin: false,
      };
    });
  }
  return http.get(`${IRC}/api/userPermission/v2/getUserAdminInfo`)
}

export function groupModelByType() {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return {
        sourceTypeList: [
          {
            value: 'rdr',
            name: '临床数据管理中心',
          },
          {
            value: 'dsd',
            name: '专病库',
          },
        ],
        sourceList: [
          {
            name: '临床数据管理中心',
            value: 'rdr',
            children: [
              {
                name: 'rdr',
                value: 'rdr',
              },
            ],
          },
          {
            name: '专病库',
            value: 'dsd',
            children: [
              {
                name: 'oc',
                value: 'oc',
              },
              {
                name: 'lc',
                value: 'lc',
              },
              {
                name: 'mcc',
                value: 'mcc',
              },
              {
                name: 'cloud_lc',
                value: 'cloud_lc',
              },
            ],
          },
        ],
      };
    });
  }
  return http.get(`${IRC}/dbManagement/groupModelByType`);
}

export function groupSourceByType() {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return [
        {
          name: '临床数据管理中心',
          value: 'rdr',
          children: [
            {
              name: 'rdr_001',
              value: 'rdr_001',
            },
          ],
        },
        {
          name: '专病库',
          value: 'dsd',
          children: [
            {
              name: 'oc_001',
              value: 'oc_001',
            },
            {
              name: 'lc_001',
              value: 'lc_001',
            },
            {
              name: 'mcc_001',
              value: 'mcc_001',
            },
            {
              name: 'cloud_lc_001',
              value: 'cloud_lc_001',
            },
          ],
        },
      ];
    });
  }

  return http.get(`${IRC}/dbManagement/groupSourceByType`);
}

export function getUserCount (roleId = 0) {
  if (process.env.NODE_ENV !== 'production' && useMock()) {
    return delayIt(() => {
      return {
        count: 10,
      };
    });
  }
  return http.get(`${IRC}/api/userRole/v2/userCount`, {
    params: {
      roleId,
    },
  });
}
