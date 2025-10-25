import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { getProfileRequest } from '@/store/slices/profile.slice';
import ScreenHeader from '@/components/ui/ScreenHeader';
import { profileScreenStyles as styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenNames } from '@/types/enum';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { profile, getProfileLoading } = useSelector(
    (state: RootState) => state.profile,
  );

  useEffect(() => {
    dispatch(getProfileRequest());
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(getProfileRequest());
  };

  const navigateToChangePassword = () => {
    navigation.navigate(ScreenNames.ProfileChangePassword);
  };

  if (getProfileLoading && !profile) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="Profile" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.safeAreaContainer} edges={['top']} />
      <View style={styles.container}>
        <ScreenHeader title="Profile" />

        <ScrollView
          style={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={getProfileLoading}
              onRefresh={onRefresh}
              colors={['#6366F1']}
            />
          }
        >
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {profile?.firstName
                    ? profile.firstName.charAt(0).toUpperCase()
                    : 'U'}
                </Text>
              </View>
            </View>

            <Text style={styles.userName}>
              {profile?.firstName && profile?.lastName
                ? `${profile.firstName} ${profile.lastName}`
                : profile?.email?.split('@')[0] || 'User Name'}
            </Text>
            <Text style={styles.userEmail}>{profile?.email || ''}</Text>
            <TouchableOpacity
              onPress={navigateToChangePassword}
              activeOpacity={0.7}
              style={styles.changePasswordContainer}
            >
              <Text style={styles.changePasswordText}>Change Password</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.infoSection}
            onPress={() => navigation.navigate(ScreenNames.EditProfile)}
            activeOpacity={0.7}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              <View style={styles.editIcon}>
                <Icon name="create-outline" size={20} color="#6366F1" />
              </View>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>First Name</Text>
              <Text style={styles.infoValue}>
                {profile?.firstName || 'Not provided'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Last Name</Text>
              <Text style={styles.infoValue}>
                {profile?.lastName || 'Not provided'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>
                {profile?.email || 'Not provided'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              <Text style={styles.infoValue}>
                {profile?.phone_number || 'Not provided'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Date of Birth</Text>
              <Text style={styles.infoValue}>
                {profile?.dob
                  ? new Date(profile.dob).toLocaleDateString()
                  : 'Not provided'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Gender</Text>
              <Text style={styles.infoValue}>
                {profile?.gender
                  ? profile.gender.charAt(0).toUpperCase() +
                    profile.gender.slice(1)
                  : 'Not provided'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Country</Text>
              <Text style={styles.infoValue}>
                {profile?.country || 'Not provided'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>City</Text>
              <Text style={styles.infoValue}>
                {profile?.city || 'Not provided'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>
                {profile?.address || 'Not provided'}
              </Text>
            </View>

            <View style={[styles.infoItem, { borderBottomWidth: 0 }]}>
              <Text style={styles.infoLabel}>Nationality</Text>
              <Text style={styles.infoValue}>
                {profile?.nationality || 'Not provided'}
              </Text>
            </View>
          </TouchableOpacity>

          {profile?.qualifications && profile.qualifications.length > 0 ? (
            <View style={styles.infoSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Your Qualifications</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditQualification', { isEdit: false })
                  }
                  style={styles.addButton}
                >
                  <Icon name="add-outline" size={20} color="#6366F1" />
                </TouchableOpacity>
              </View>
              {profile.qualifications.map((qualification, index) => (
                <TouchableOpacity
                  key={qualification.id}
                  style={[
                    styles.qualificationCard,
                    index === profile.qualifications.length - 1 && {
                      marginBottom: 0,
                    },
                  ]}
                  onPress={() =>
                    navigation.navigate('EditQualification', {
                      qualification,
                      isEdit: true,
                    })
                  }
                  activeOpacity={0.7}
                >
                  <View style={styles.qualificationHeader}>
                    <Text style={styles.qualificationNumber}>
                      Qualification {index + 1}
                    </Text>
                    <View style={styles.editIcon}>
                      <Icon name="create-outline" size={20} color="#6366F1" />
                    </View>
                  </View>

                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>University</Text>
                    <Text style={styles.infoValue}>
                      {qualification.university_name}
                    </Text>
                  </View>

                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>School Average</Text>
                    <Text style={styles.infoValue}>
                      {qualification.school_average}
                    </Text>
                  </View>

                  <View style={[styles.infoItem, { borderBottomWidth: 0 }]}>
                    <Text style={styles.infoLabel}>Budget Range</Text>
                    <Text style={styles.infoValue}>
                      ${qualification.budget_min?.toLocaleString() || '0'} - $
                      {qualification.budget_max?.toLocaleString() || '0'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <TouchableOpacity
              style={styles.infoSection}
              onPress={() =>
                navigation.navigate('EditQualification', { isEdit: false })
              }
              activeOpacity={0.7}
            >
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Your Qualifications</Text>
                <View style={styles.editIcon}>
                  <Icon name="add-outline" size={20} color="#6366F1" />
                </View>
              </View>
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  Tap to add your educational qualifications and budget
                  information
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {profile?.interests && profile.interests.length > 0 && (
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Interests</Text>
              <View style={styles.interestsContainer}>
                {profile.interests.map((interest, index) => (
                  <View key={index} style={styles.interestTag}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.infoSection}
            onPress={() =>
              navigation.navigate('EditAcademicBackground', {
                academicBackground: profile?.academicPrevious,
                isEdit: !!profile?.academicPrevious,
              })
            }
            activeOpacity={0.7}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Academic Background</Text>
              <View style={styles.editIcon}>
                <Icon name="create-outline" size={20} color="#6366F1" />
              </View>
            </View>

            {profile?.academicPrevious ? (
              <>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Previous University</Text>
                  <Text style={styles.infoValue}>
                    {profile.academicPrevious.previous_university_name}
                  </Text>
                </View>

                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Study Duration</Text>
                  <Text style={styles.infoValue}>
                    {profile.academicPrevious.previous_study_duration}
                  </Text>
                </View>

                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Transfer Credits</Text>
                  <Text style={styles.infoValue}>
                    {profile.academicPrevious.transfer_credits}
                  </Text>
                </View>

                <View style={[styles.infoItem, { borderBottomWidth: 0 }]}>
                  <Text style={styles.infoLabel}>Transfer Reason</Text>
                  <Text style={[styles.infoValue, { flex: 1 }]}>
                    {profile.academicPrevious.transfer_reason}
                  </Text>
                </View>
              </>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  Tap to add your previous academic background information
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
      <SafeAreaView edges={['bottom']} />
    </>
  );
};

export default ProfileScreen;
