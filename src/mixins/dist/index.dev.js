"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aMixin = void 0;

var _TopSearch = _interopRequireDefault(require("@components/common/TopSearch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var aMixin = {
  data: function data() {
    return {
      query: {
        page: 1,
        size: 10,
        keyword: null
      },
      total: 0
    };
  },
  methods: {
    // 最大页
    handleSizeChange: function handleSizeChange(callback, value) {
      this.query.size = value;
      this.query.page = 1;
      callback();
    },
    // 当前页
    handleCurrentChange: function handleCurrentChange(callback, value) {
      this.query.page = value;
      console.log(this.query.page);
      callback();
    },
    // 清除搜索框
    handleClose: function handleClose(callback) {
      this.query.keyword = null;
      callback();
    },
    // enter搜索
    handleEnter: function handleEnter(callback, value) {
      this.query.keyword = value;
      callback();
    },
    // 通过id删除用户
    deleteById: function deleteById(delCallback, fetchCallback, id, info) {
      var _this = this;

      this.$confirm('此操作将永久删除' + info + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      }).then(function _callee() {
        var _ref, success;

        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return regeneratorRuntime.awrap(delCallback(id));

              case 2:
                _ref = _context.sent;
                success = _ref.success;

                if (success) {
                  _this.$message.success('删除成功');

                  fetchCallback();
                } else {
                  _this.$message.error('删除失败');
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        });
      })["catch"](function () {
        _this.$message.warning('已取消删除');
      });
    },
    // 处理成功标志
    handleSuccess: function handleSuccess(success, info, callback) {
      if (success) {
        this.$message.success("".concat(info, "\u6210\u529F"));
        callback && callback();
      } else {
        this.$message.error("".concat(info, "\u5931\u8D25"));
      }
    }
  },
  components: {
    topSearch: _TopSearch["default"]
  }
};
exports.aMixin = aMixin;