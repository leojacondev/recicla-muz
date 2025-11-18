import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { InstitutionalInfo } from '@/types/institutional';
import { styles } from './AboutModal.styles';

interface AboutModalProps {
  visible: boolean;
  onClose: () => void;
  institutionalInfo: InstitutionalInfo;
}

export function AboutModal({ visible, onClose, institutionalInfo }: AboutModalProps) {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === 'dark';

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, isDark && styles.containerDark]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, isDark && styles.textDark]}>
              Sobre o Projeto
            </Text>
            <TouchableOpacity
              onPress={onClose}
              accessibilityLabel="Fechar"
              accessibilityRole="button"
            >
              <Ionicons
                name="close"
                size={28}
                color={isDark ? '#fff' : '#000'}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Logo da Instituição */}
            {institutionalInfo.institution.logo && (
              <View style={styles.institutionSection}>
                <Image
                  source={institutionalInfo.institution.logo}
                  style={styles.institutionLogo}
                  resizeMode="contain"
                />
                <Text style={[styles.institutionName, isDark && styles.textDark]}>
                  {institutionalInfo.institution.fullName}
                </Text>
              </View>
            )}

            {/* Informações do Projeto */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
                Projeto
              </Text>
              <Text style={[styles.projectName, isDark && styles.textDark]}>
                {institutionalInfo.projectName}
              </Text>
              <Text style={[styles.projectType, isDark && styles.textSecondaryDark]}>
                {institutionalInfo.projectType === 'academic' && 'Projeto Acadêmico'}
                {institutionalInfo.projectType === 'research' && 'Projeto de Pesquisa'}
                {institutionalInfo.projectType === 'commercial' && 'Projeto Comercial'}
              </Text>
              {institutionalInfo.academicYear && (
                <Text style={[styles.detail, isDark && styles.textSecondaryDark]}>
                  Ano Letivo: {institutionalInfo.academicYear}
                </Text>
              )}
            </View>

            {/* Curso */}
            {institutionalInfo.course && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
                  Curso
                </Text>
                <Text style={[styles.detail, isDark && styles.textSecondaryDark]}>
                  {institutionalInfo.course.name}
                </Text>
                {institutionalInfo.course.department && (
                  <Text style={[styles.detail, isDark && styles.textSecondaryDark]}>
                    {institutionalInfo.course.department}
                  </Text>
                )}
              </View>
            )}

            {/* Orientador */}
            {institutionalInfo.supervisor && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
                  Orientação
                </Text>
                <Text style={[styles.supervisorName, isDark && styles.textDark]}>
                  {institutionalInfo.supervisor.title} {institutionalInfo.supervisor.name}
                </Text>
                {institutionalInfo.supervisor.department && (
                  <Text style={[styles.detail, isDark && styles.textSecondaryDark]}>
                    {institutionalInfo.supervisor.department}
                  </Text>
                )}
              </View>
            )}

            {/* Equipe */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
                Equipe de Desenvolvimento
              </Text>
              {institutionalInfo.team.map((member) => (
                <View key={member.id} style={styles.teamMember}>
                  {member.photo && (
                    <Image
                      source={member.photo}
                      style={styles.memberPhoto}
                    />
                  )}
                  <View style={styles.memberInfo}>
                    <Text style={[styles.memberName, isDark && styles.textDark]}>
                      {member.name}
                    </Text>
                    <Text style={[styles.memberRole, isDark && styles.textSecondaryDark]}>
                      {member.role === 'leader' && 'Líder do Projeto'}
                      {member.role === 'developer' && 'Desenvolvedor'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Versão */}
            {institutionalInfo.version && (
              <View style={styles.versionSection}>
                <Text style={[styles.versionText, isDark && styles.textSecondaryDark]}>
                  Versão {institutionalInfo.version}
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
