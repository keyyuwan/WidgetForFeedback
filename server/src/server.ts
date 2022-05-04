import express from 'express'
import { routes } from './routes'

const app = express()

// Middleware -> verifica se na req existe um body em JSON.
// Se sim, transforma isso em um objeto JS
app.use(express.json())
app.use(routes)

app.listen(3333, () => console.log('Server running'))
