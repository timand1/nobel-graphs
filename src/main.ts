import { createApp } from 'vue'
import App from './App.vue'
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, BarElement, LineElement, CategoryScale, LinearScale, ArcElement, RadialLinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, PointElement, CategoryScale, ArcElement, LinearScale, LineElement, RadialLinearScale)

createApp(App).mount('#app')
