import Vue from 'vue'
import MessageBox from 'element-ui/lib/message-box'
import Notification from 'element-ui/lib/notification'
import Message from 'element-ui/lib/message'
import Loading from 'element-ui/lib/loading'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Loading)
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
