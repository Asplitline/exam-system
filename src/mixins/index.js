import topSearch from '@components/common/TopSearch';
export const aMixin = {
    data () {
        return {
            query: {
                page: 1,
                size: 10,
                keyword: null
            },
            total: 0
        }
    },
    methods: {
        // 最大页
        handleSizeChange (callback, value) {
            this.query.size = value
            this.query.page = 1
            callback()
        },
        // 当前页
        handleCurrentChange (callback, value) {
            this.query.page = value
            console.log(this.query.page)
            callback()
        },
        // 清除搜索框
        handleClose (callback) {
            this.query.keyword = null
            callback()
        },
        // enter搜索
        handleEnter (callback, value) {
            this.query.keyword = value
            callback()
        },
        // 通过id删除用户
        deleteById (delCallback, fetchCallback, id, info) {
            this.$confirm('此操作将永久删除' + info + ', 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error',
                center: true
            })
                .then(async () => {
                    const { success } = await delCallback(id)
                    if (success) {
                        this.$message.success('删除成功')
                        fetchCallback()
                    } else {
                        this.$message.error('删除失败')
                    }
                })
                .catch(() => {
                    this.$message.warning('已取消删除')
                })
        }
    },
    components: {
        topSearch
    }
}
