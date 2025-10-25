import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getCountriesRequest } from '@/store/slices/profile.slice';
import ScreenHeader from '@/components/ui/ScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { goBack } from '@/utils/navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { colors } from '@/constants/theme/colors';

interface CountrySelectionScreenProps {
  route: {
    params: {
      onSelectCountry: (country: any) => void;
      selectedCountry?: string;
      title?: string;
    };
  };
}

const CountrySelectionScreen: React.FC<any> = ({ route }) => {
  const dispatch = useDispatch();
  const { countries, getCountriesLoading } = useSelector(
    (state: RootState) => state.profile,
  );

  const {
    onSelectCountry,
    selectedCountry,
    title = 'Select Country',
  } = route.params;

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);

  useEffect(() => {
    if (!countries) {
      dispatch(getCountriesRequest());
    }
  }, [dispatch, countries]);

  useEffect(() => {
    if (countries) {
      const filtered = countries.filter((country: string) =>
        country.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredCountries(filtered);
    }
  }, [countries, searchQuery]);

  const handleBack = () => {
    goBack();
  };

  const handleSelectCountry = (country: any) => {
    onSelectCountry(country);
    goBack();
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const renderCountryItem = ({ item }: { item: string }) => {
    const isSelected = selectedCountry === item;

    return (
      <TouchableOpacity
        style={[styles.countryItem, isSelected && styles.selectedCountryItem]}
        activeOpacity={0.7}
        onPress={() => handleSelectCountry({ name: item })}
      >
        <View style={styles.countryContent}>
          <Text style={styles.countryName}>{item}</Text>
        </View>
        {isSelected && (
          <Icon name="checkmark" size={20} color={colors.primary} />
        )}
      </TouchableOpacity>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No countries found</Text>
    </View>
  );

  if (getCountriesLoading) {
    return (
      <>
        <SafeAreaView style={styles.safeAreaContainer} edges={['top']} />
        <View style={styles.container}>
          <ScreenHeader
            title={title}
            showBackButton={true}
            onBackPress={handleBack}
          />
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading countries...</Text>
          </View>
        </View>
        <SafeAreaView edges={['bottom']} />
      </>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.safeAreaContainer} edges={['top']} />
      <View style={styles.container}>
        <ScreenHeader
          title={title}
          showBackButton={true}
          onBackPress={handleBack}
        />

        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search countries..."
              value={searchQuery}
              onChangeText={handleSearchChange}
              placeholderTextColor={colors.text.tertiary}
              returnKeyType="search"
            />
            {searchQuery ? (
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleClearSearch}
                activeOpacity={0.7}
              >
                <Icon
                  name="close-outline"
                  size={20}
                  color={colors.text.secondary}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.searchButton}>
                <Icon name="search-outline" size={20} color={colors.primary} />
              </View>
            )}
          </View>

          <FlatList
            data={filteredCountries}
            renderItem={renderCountryItem}
            keyExtractor={item => item}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmpty}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </View>
      <SafeAreaView edges={['bottom']} />
    </>
  );
};

export default CountrySelectionScreen;
