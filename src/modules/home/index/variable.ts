import { ref, reactive } from 'vue'

export const count = ref(0)
export const layout = reactive({
  title: "My graph",
  width: 700,
  xaxis: {
    // range: [ 0.75, 5.25 ]
  },
  yaxis: {
    // range: [0, 8]
  },
})

export default { count, layout }