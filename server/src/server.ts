import express from 'express'
import cors from 'cors'
import { routes } from './routes'

const app = express()

app.use(cors())

// Middleware -> verifica se na req existe um body em JSON.
// Se sim, transforma isso em um objeto JS
app.use(express.json())
app.use(routes)

app.listen(process.env.PORT || 3333, () => console.log('Server running'))
