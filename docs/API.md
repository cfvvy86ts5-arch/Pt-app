# PT-App API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
All endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

## Endpoints

### Users

#### Register User
```
POST /auth/register
Body: { email, password, name, age?, gender?, height?, weight? }
Response: { userId, token }
```

#### Login
```
POST /auth/login
Body: { email, password }
Response: { userId, token }
```

### Tracking

#### Log Nutrition
```
POST /nutrition/log
Body: { foodName, calories, protein, carbs, fat, mealType }
Response: { nutritionLogId }
```

#### Get Nutrition Logs
```
GET /nutrition/logs?date=YYYY-MM-DD
Response: [{ id, foodName, calories, ... }]
```

#### Log Hydration
```
POST /hydration/log
Body: { amount, type? }
Response: { hydrationLogId }
```

#### Log Mood
```
POST /mood/log
Body: { mood (1-5), energy?, stress?, notes? }
Response: { moodEntryId }
```

### Workouts

#### Create Workout
```
POST /workouts
Body: { name, description?, duration, exercises[] }
Response: { workoutId }
```

#### Get Workouts
```
GET /workouts?date=YYYY-MM-DD
Response: [{ id, name, duration, ... }]
```

#### Log Exercise
```
POST /workouts/:id/exercises
Body: { name, sets?, reps?, weight?, duration? }
Response: { exerciseId }
```

### Goals

#### Create Goal
```
POST /goals
Body: { title, description?, category, targetValue?, deadline? }
Response: { goalId }
```

#### Get Goals
```
GET /goals?category=fitness&status=active
Response: [{ id, title, category, ... }]
```

#### Update Goal Progress
```
PUT /goals/:id/progress
Body: { currentValue }
Response: { goalId, progress% }
```

### Reminders ⏰ **NEW**

#### Create Reminder
```
POST /reminders
Body: {
  type: "water" | "nutrition" | "goal" | "workout" | "mood",
  title: string,
  description?: string,
  scheduledTime: "HH:MM",
  frequency: "daily" | "weekly",
  daysOfWeek?: [0-6],
  userId: string
}
Response: { reminderId, success }
```

#### Get Reminders
```
GET /reminders?userId=XXX
Response: [{ id, type, title, scheduledTime, ... }]
```

#### Update Reminder
```
PUT /reminders/:id
Body: { title?, scheduledTime?, frequency?, isActive? }
Response: { reminderId, success }
```

#### Delete Reminder
```
DELETE /reminders/:id
Response: { success, message }
```

### Meal Plans 🍽️ **NEW**

#### Create Meal Plan
```
POST /meal-plans
Body: {
  userId: string,
  name: string,
  description?: string,
  startDate: ISO8601,
  endDate?: ISO8601,
  meals: [
    {
      dayOfWeek: 0-6,
      mealType: "breakfast" | "lunch" | "dinner" | "snack",
      foodName: string,
      calories: number,
      protein?: number,
      carbs?: number,
      fat?: number,
      quantity?: number,
      unit?: string
    }
  ]
}
Response: { mealPlanId, success }
```

#### Get Meal Plans
```
GET /meal-plans?userId=XXX&activeOnly=true
Response: [{ id, name, startDate, meals: [...] }]
```

#### Get Meals for Specific Day
```
GET /meal-plans/day/:dayOfWeek?userId=XXX
Response: [{ id, mealType, foodName, calories, ... }]
```

#### Update Meal Plan
```
PUT /meal-plans/:id
Body: { name?, description?, endDate?, isActive? }
Response: { mealPlanId, success }
```

#### Delete Meal Plan
```
DELETE /meal-plans/:id
Response: { success, message }
```

### Chat

#### Send Message to Chatbot
```
POST /chat
Body: { botType (mental_health|healthcare|goal_buddy), message }
Response: { response, timestamp }
```

#### Get Chat History
```
GET /chat/history?botType=mental_health
Response: [{ id, message, response, ... }]
```

### Health Analysis

#### Get Nutrition Analysis
```
GET /analysis/nutrition
Response: { deficiencies: [], risks: [], recommendations: [] }
```

#### Get Health Risks
```
GET /analysis/health-risks
Response: [{ riskType, severity, description, ... }]
```

#### Get Predictions
```
GET /analysis/predictions
Response: { estimatedGoalCompletion, healthTrends, recommendations: [] }
```

### Buddy System

#### Send Buddy Request
```
POST /buddy/request
Body: { buddyId, type (workout_buddy|goal_buddy) }
Response: { requestId, status: pending }
```

#### Get Buddy Requests
```
GET /buddy/requests
Response: [{ id, buddyId, type, status, ... }]
```

#### Accept Buddy Request
```
PUT /buddy/request/:id/accept
Response: { requestId, status: accepted }
```

## Socket.io Events

### Real-time Chat
```javascript
// Send message
socket.emit('buddy-message', { buddyId, message })

// Receive message
socket.on('buddy-message', (data) => { ... })
```

### Workout Coaching
```javascript
// Send pose frame
socket.emit('workout-pose', { frameData, exerciseName })

// Receive correction
socket.on('workout-correction', (data) => { ... })
```

## Error Responses

```json
{
  "error": "Error message",
  "status": 400,
  "details": {}
}
```

Common status codes:
- 200: Success
- 201: Created
- 400: Bad request
- 401: Unauthorized
- 404: Not found
- 500: Server error
