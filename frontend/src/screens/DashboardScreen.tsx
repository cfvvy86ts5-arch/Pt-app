import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ProgressBar } from '../components/ProgressBar';
import { ProgressCircle } from '../components/ProgressCircle';

interface Goal {
  id: string;
  title: string;
  category: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  progress: number;
}

export default function DashboardScreen() {
  const [goals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Gewichtsverlies',
      category: 'fitness',
      currentValue: 92,
      targetValue: 85,
      unit: 'kg',
      progress: 72,
    },
    {
      id: '2',
      title: 'Waterinname',
      category: 'hydration',
      currentValue: 1800,
      targetValue: 2000,
      unit: 'ml',
      progress: 90,
    },
    {
      id: '3',
      title: 'Beweging',
      category: 'fitness',
      currentValue: 25000,
      targetValue: 30000,
      unit: 'stappen',
      progress: 83,
    },
  ]);

  const [healthRisks] = useState([
    { type: 'Vitamine D tekort', severity: 'medium', recommendation: 'Meer zonlicht of supplementen' },
    { type: 'Calcium tekort', severity: 'low', recommendation: 'Meer zuivel producten' },
  ]);

  const averageProgress = Math.round(
    goals.reduce((sum, g) => sum + g.progress, 0) / goals.length
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return '#FF6B6B';
      case 'medium':
        return '#FFE66D';
      case 'low':
        return '#4CAF50';
      default:
        return '#999';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Jouw Dashboard 📊</Text>

        {/* Overall Progress */}
        <View style={styles.overallProgressSection}>
          <Text style={styles.sectionTitle}>Algehele voortgang</Text>
          <View style={styles.progressCircleContainer}>
            <ProgressCircle
              progress={averageProgress}
              radius={80}
              strokeWidth={8}
              color="#4CAF50"
              backgroundColor="#e0e0e0"
              centerText={`${averageProgress}%`}
              label="Vooruitgang"
            />
          </View>
        </View>

        {/* Goals with Progress Bars */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Jouw Doelen</Text>
          {goals.map((goal) => (
            <View key={goal.id} style={styles.goalCard}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                <Text style={styles.goalTarget}>
                  {goal.currentValue} / {goal.targetValue} {goal.unit}
                </Text>
              </View>
              <ProgressBar
                progress={goal.progress}
                color={goal.progress >= 80 ? '#4CAF50' : goal.progress >= 50 ? '#FFE66D' : '#FF6B6B'}
                label={`${goal.category === 'fitness' ? '💪' : '💧'} Voortgang`}
                showPercentage={false}
              />
            </View>
          ))}
        </View>

        {/* Nutrition Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voeding Analyse</Text>
          <View style={styles.nutritionCard}>
            <View style={styles.nutrientRow}>
              <Text style={styles.nutrientLabel}>Calorieën (vandaag)</Text>
              <ProgressBar
                progress={75}
                height={6}
                color="#FF6B6B"
                showPercentage={false}
              />
              <Text style={styles.nutrientValue}>1500 / 2000 kcal</Text>
            </View>

            <View style={styles.nutrientRow}>
              <Text style={styles.nutrientLabel}>Eiwit</Text>
              <ProgressBar
                progress={60}
                height={6}
                color="#4ECDC4"
                showPercentage={false}
              />
              <Text style={styles.nutrientValue}>45 / 75g</Text>
            </View>

            <View style={styles.nutrientRow}>
              <Text style={styles.nutrientLabel}>Koolhydraten</Text>
              <ProgressBar
                progress={80}
                height={6}
                color="#FFE66D"
                showPercentage={false}
              />
              <Text style={styles.nutrientValue}>200 / 250g</Text>
            </View>

            <View style={styles.nutrientRow}>
              <Text style={styles.nutrientLabel}>Vet</Text>
              <ProgressBar
                progress={50}
                height={6}
                color="#95E1D3"
                showPercentage={false}
              />
              <Text style={styles.nutrientValue}>35 / 70g</Text>
            </View>
          </View>
        </View>

        {/* Health Risks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚠️ Gezondheidsrisico's</Text>
          {healthRisks.length === 0 ? (
            <Text style={styles.noRisksText}>Geen kritische risico's gedetecteerd ✅</Text>
          ) : (
            healthRisks.map((risk, idx) => (
              <View key={idx} style={styles.riskCard}>
                <View
                  style={[
                    styles.riskSeverity,
                    { backgroundColor: getSeverityColor(risk.severity) },
                  ]}
                />
                <View style={styles.riskContent}>
                  <Text style={styles.riskType}>{risk.type}</Text>
                  <Text style={styles.riskRecommendation}>{risk.recommendation}</Text>
                  <Text style={styles.riskSeverityLabel}>
                    Ernst: {risk.severity === 'high' ? '🔴 Hoog' : risk.severity === 'medium' ? '🟡 Gemiddeld' : '🟢 Laag'}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Future Mirror */}
        <View style={styles.section}>
          <View style={styles.mirrorCard}>
            <Text style={styles.mirrorTitle}>✨ Jouw Toekomstige Zelf</Text>
            <Text style={styles.mirrorSubtitle}>Na 12 weken</Text>
            <View style={styles.mirrorStats}>
              <View style={styles.mirrorStat}>
                <Text style={styles.mirrorStatValue}>85 kg</Text>
                <Text style={styles.mirrorStatLabel}>Gewicht</Text>
              </View>
              <View style={styles.mirrorStat}>
                <Text style={styles.mirrorStatValue}>100%</Text>
                <Text style={styles.mirrorStatLabel}>Doelen bereikt</Text>
              </View>
              <View style={styles.mirrorStat}>
                <Text style={styles.mirrorStatValue}>8.5/10</Text>
                <Text style={styles.mirrorStatLabel}>Gezondheid score</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Predictions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔮 Voorspellingen</Text>
          <View style={styles.predictionCard}>
            <View style={styles.predictionItem}>
              <Text style={styles.predictionLabel}>⏱️ Tijd tot doelbereik</Text>
              <Text style={styles.predictionValue}>~12 weken</Text>
            </View>
            <View style={styles.predictionItem}>
              <Text style={styles.predictionLabel}>📈 Geschatte voortgang deze week</Text>
              <Text style={styles.predictionValue}>+2.5%</Text>
            </View>
            <View style={styles.predictionItem}>
              <Text style={styles.predictionLabel}>💪 Aanbevolen intensiteit</Text>
              <Text style={styles.predictionValue}>Gemiddeld</Text>
            </View>
          </View>
        </View>

        {/* Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Aanbevelingen</Text>
          <View style={styles.recommendationCard}>
            <Text style={styles.recommendationText}>
              • Verhoog je waterinname met 200ml per dag
            </Text>
            <Text style={styles.recommendationText}>
              • Voeg meer vitamine D bronnen toe aan je dieet
            </Text>
            <Text style={styles.recommendationText}>
              • Probeer 3-4 keer per week te trainen
            </Text>
            <Text style={styles.recommendationText}>
              • Zorg voor voldoende slaap (7-9 uur)
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  overallProgressSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  progressCircleContainer: {
    marginTop: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  goalCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  goalTarget: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  nutritionCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
  },
  nutrientRow: {
    marginBottom: 12,
  },
  nutrientLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  nutrientValue: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  riskCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  riskSeverity: {
    width: 4,
    height: 60,
    borderRadius: 2,
    marginRight: 12,
  },
  riskContent: {
    flex: 1,
  },
  riskType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  riskRecommendation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  riskSeverityLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#999',
  },
  noRisksText: {
    fontSize: 14,
    color: '#4CAF50',
    textAlign: 'center',
    paddingVertical: 15,
  },
  mirrorCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  mirrorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 4,
  },
  mirrorSubtitle: {
    fontSize: 13,
    color: '#1976D2',
    marginBottom: 12,
  },
  mirrorStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mirrorStat: {
    alignItems: 'center',
  },
  mirrorStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  mirrorStatLabel: {
    fontSize: 11,
    color: '#1976D2',
    marginTop: 4,
  },
  predictionCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
  },
  predictionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  predictionLabel: {
    fontSize: 13,
    color: '#666',
  },
  predictionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  recommendationCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
  },
  recommendationText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 8,
    lineHeight: 18,
  },
});
