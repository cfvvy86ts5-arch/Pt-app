# PT-App: Personal Health & Wellness Platform

Een all-in-one gezondheids- en welzijnsapplicatie met AI-chatbots, fitness tracking, voeding bijhouden, en voortgang monitoring.

## 🎯 Kern Features

- **Mentale Gezondheid**: Chatbot voor mentaal welzijn
- **Healthcare**: Medische chatbot & gezondheidsrisico-analyse
- **Nutrition Tracking**: Voeding & drinken bijhouden
- **Mood Tracking**: Dagelijks gemoedstoestand monitoren
- **Voedingsanalyse**: Detectie nutriëntendeficiënties & gezondheidsrisico's
- **Planning**: Voedingsschema & sportschema
- **Social**: Sportbuddy & doelen-buddy chat
- **AI Workout Coach**: Real-time oefening-correctie via camera
- **Future Mirror**: Visualisatie van toekomstige jij na doelrealisatie
- **Dashboard**: Resultaten, voorspellingen, voortgang tracking

## 🏗️ Project Structuur

```
Pt-app/
├── backend/              # Node.js + Express API
├── frontend/             # React Native / Next.js
├── ml-service/           # Python ML microservice
├── database/             # PostgreSQL schema & migrations
└── docs/                 # Documentatie & architecture
```

## 🛠️ Tech Stack

- **Frontend**: React Native + Expo
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **AI/Chatbots**: OpenAI API
- **ML**: Python + TensorFlow Lite (pose detection)
- **Real-time**: Socket.io
- **Authentication**: JWT + OAuth2

## 📋 Development Roadmap

### Phase 1: Core Infrastructure (Week 1-2)
- [ ] Backend API setup
- [ ] Database schema & migrations
- [ ] User authentication
- [ ] Basic frontend navigation

### Phase 2: Tracking Features (Week 3-4)
- [ ] Nutrition tracking
- [ ] Mood tracking
- [ ] Hydration tracking
- [ ] Dashboard

### Phase 3: AI & Chatbots (Week 5-6)
- [ ] Mental health chatbot
- [ ] Healthcare chatbot
- [ ] Goal buddy chat

### Phase 4: Advanced Features (Week 7-8)
- [ ] Nutrition analysis & health risks
- [ ] Workout buddy (pose detection)
- [ ] Future mirror (visualization)
- [ ] Meal & workout planning

### Phase 5: Social & Gamification (Week 9-10)
- [ ] Sport buddy matching
- [ ] Leaderboards & achievements
- [ ] Progress predictions

## 🚀 Getting Started

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm start

# ML Service
cd ml-service
pip install -r requirements.txt
python app.py
```

## 📖 Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Setup Guide](./docs/SETUP.md)

## 👥 Team

Created by: cfvvy86ts5-arch

## 📄 License

MIT
