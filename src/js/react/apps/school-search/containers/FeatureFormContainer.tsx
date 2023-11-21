import { useAtomValue, useSetAtom, useAtom } from 'jotai';
import { Button, Checkbox, TextInput, Select, } from 'hds-react';
import { useState } from 'react';

import {
  stagedParamsAtom,
  updateParamsAtom,
  a1Atom,
  a1SelectionAtom,
  a2Atom,
  a2SelectionAtom
} from '../store';
import type SearchParams from '../types/SearchParams';
import SelectionsContainer from './SelectionsContainer';
import SearchComponents from '../enum/SearchComponents';
import OptionType from '../types/OptionType';

type SubmitFormType = HTMLFormElement & {
  keyword: HTMLInputElement;
  finnish_education: HTMLInputElement;
  grades_1_6: HTMLInputElement;
  swedish_education: HTMLInputElement;
  grades_7_9: HTMLInputElement;
};

const FeatureFormContainer = () => {
  const [keywordValue, setKeywordValue] = useState<string|undefined>();
  const stagedParams = useAtomValue(stagedParamsAtom);
  const setParams = useSetAtom(updateParamsAtom);
  const setStagedParams = useSetAtom(stagedParamsAtom);
  const a1Options = useAtomValue(a1Atom);
  const [a1Selection, setA1Filter] = useAtom(a1SelectionAtom);
  const a2Options = useAtomValue(a2Atom);
  const [a2Selection, setA2Filter] = useAtom(a2SelectionAtom);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { keyword, finnish_education, grades_1_6, grades_1_9, grades_7_9, swedish_education } = event.target as SubmitFormType;
    const params: SearchParams = {};

    if (keyword.value && keyword.value.length) {
      params.keyword = keyword.value;
    };

    [finnish_education, grades_1_6, grades_1_9, grades_7_9, swedish_education].forEach(element => {
      if (!element || !element.checked || !element.name) {
        return;
      };

      const name = element.name as keyof Omit<SearchParams, 'keyword'|'page'|'query'|'a1'|'a2'|'b1'|'b2'|'weighted_education'|'bilingual_education'>;
      params[name] = true;
    });

    params.a1 = a1Selection.map((selection: OptionType) => selection.value);
    params.a2 = a2Selection.map((selection: OptionType) => selection.value);

    setParams(params);
  };

  const keys: Array<keyof Omit<SearchParams, 'keyword'|'page'|'query'|'a1'|'a2'|'b1'|'b2'|'weighted_education'|'bilingual_education'>> = ['grades_1_6', 'grades_1_9', 'grades_7_9', 'finnish_education', 'swedish_education'];
  const A1Label: string = Drupal.t('Foreign language starting in 1st grade (A1)', {}, { context: 'TPR Ontologyword details schools' });
  const A2Label: string = Drupal.t('Optional foreign language starting in 3rd grade (A2)', {}, { context: 'TPR Ontologyword details schools' });
  const B1Label: string = Drupal.t('Second national language starting in 6th grade (B1)', {}, { context: 'TPR Ontologyword details schools' });
  const B2Label: string = Drupal.t('Optional foreign language starting in 8th grade (B2)', {}, { context: 'TPR Ontologyword details schools' });
  const WeightedEducationLabel: string = Drupal.t('Weighted curriculum education', {}, { context: 'TPR Ontologyword details schools' });
  const BilingualEducationLabel: string = Drupal.t('Bilingual education', {}, { context: 'TPR Ontologyword details schools' });

  return (
    <form className='react-search__form-container' onSubmit={onSubmit}>
      <h3>
        {Drupal.t('Search with school details', {}, {context: 'School search: Feature form title'})}
      </h3>
      <p className='react-search__form-description'>
        {Drupal.t(
          'You can search for a school by its name, language of instruction, grade or post code.',
          {},
          {context: 'School search: Feature form description'}
        )}
      </p>
      <TextInput
        className='hdbt-search__filter'
        id='keyword'
        label={Drupal.t('School\'s name or post code', {}, {context: 'School search: Feature input label'})}
        name='keyword'
        onChange={({target: { value }}: { target: { value: string }}) => setKeywordValue(value)}
        type='search'
        value={keywordValue}
      />
      <div className='react-search__checkbox-filter-container'>
        <fieldset className='react-search__fieldset'>
          <legend className='react-search__legend'>
            {Drupal.t('Language of instruction', {}, {context: 'School search: language options'})}
          </legend>
          <Checkbox
            className='react-search__checkbox'
            checked={stagedParams?.finnish_education || false}
            id='finnish_education'
            label={Drupal.t('Finnish')}
            name='finnish_education'
            onClick={() => setStagedParams({...stagedParams, finnish_education: !stagedParams?.finnish_education})}
            value={stagedParams?.finnish_education?.toString() || 'false'}
          />
          <Checkbox
            className='react-search__checkbox'
            checked={stagedParams?.swedish_education || false}
            id='swedish_education'
            label={Drupal.t('Swedish')}
            name='swedish_education'
            onClick={() => setStagedParams({...stagedParams, swedish_education: !stagedParams?.swedish_education})}
            value={stagedParams?.swedish_education?.toString() || 'false'}
          />
        </fieldset>
        <fieldset className='react-search__fieldset'>
          <legend className='react-search__legend'>
            {Drupal.t('Grade', {}, {context: 'School search: education level'})}
          </legend>
          <Checkbox
            className='react-search__checkbox'
            checked={stagedParams?.grades_1_6 || false}
            id='grades_1_6'
            label={Drupal.t('School providing grades 1 to 6', {}, {context: 'School search: education level option'})}
            name='grades_1_6'
            onClick={() => setStagedParams({...stagedParams, grades_1_6: !stagedParams?.grades_1_6})}
            value={stagedParams?.grades_1_6?.toString() || 'false'}
          />
          <Checkbox
            className='react-search__checkbox'
            id='grades_1_9'
            checked={stagedParams?.grades_1_9 || false}
            label={Drupal.t('School providing grades 1 to 9', {}, {context: 'School search: education level option'})}
            name='grades_1_9'
            onClick={() => setStagedParams({...stagedParams, grades_1_9: !stagedParams?.grades_1_9})}
            value={stagedParams?.grades_1_9?.toString() || 'false'}
          />
          <Checkbox
            className='react-search__checkbox'
            checked={stagedParams?.grades_7_9 || false}
            id='grades_7_9'
            label={Drupal.t('School providing grades 7 to 9', {}, {context: 'School search: education level option'})}
            name='grades_7_9'
            onClick={() => setStagedParams({...stagedParams, grades_7_9: !stagedParams?.grades_7_9})}
            value={stagedParams?.grades_7_9?.toString() || 'false'}
          />
        </fieldset>
      </div>
      <div className='hdbt-search--react__dropdown-filters'>
        {/* @ts-ignore */}
        <Select
          clearable
          clearButtonAriaLabel={Drupal.t('Clear @label selection', {'@label': A1Label}, { context: 'React search clear selection label' })}
          className='hdbt-search--react__dropdown'
          selectedItemRemoveButtonAriaLabel={Drupal.t(
            'Remove item',
            {},
            { context: 'React search remove item aria label' }
          )}
          placeholder={Drupal.t('All languages')}
          multiselect
          label={A1Label}
          options={a1Options}
          value={a1Selection}
          id={SearchComponents.A1}
          onChange={setA1Filter}
        />
        {/* @ts-ignore */}
        <Select
          clearable
          clearButtonAriaLabel={Drupal.t('Clear @label selection', {'@label': A2Label}, { context: 'React search clear selection label' })}
          className='hdbt-search--react__dropdown'
          selectedItemRemoveButtonAriaLabel={Drupal.t(
            'Remove item',
            {},
            { context: 'React search remove item aria label' }
          )}
          placeholder={Drupal.t('All languages')}
          multiselect
          label={A2Label}
          options={a2Options}
          value={a2Selection}
          id={SearchComponents.A2}
          onChange={setA2Filter}
        />
        {/* @ts-ignore */}
        <Select
          clearable
          clearButtonAriaLabel={Drupal.t('Clear @label selection', {'@label': B1Label}, { context: 'React search clear selection label' })}
          className='hdbt-search--react__dropdown'
          selectedItemRemoveButtonAriaLabel={Drupal.t(
            'Remove item',
            {},
            { context: 'React search remove item aria label' }
          )}
          placeholder={Drupal.t('All languages')}
          multiselect
          label={B1Label}
          // options={taskAreasOptions}
          // value={taskAreaSelection}
          id={SearchComponents.B1}
          // onChange={setTaskAreaFilter}
        />
        {/* @ts-ignore */}
        <Select
          clearable
          clearButtonAriaLabel={Drupal.t('Clear @label selection', {'@label': B2Label}, { context: 'React search clear selection label' })}
          className='hdbt-search--react__dropdown'
          selectedItemRemoveButtonAriaLabel={Drupal.t(
            'Remove item',
            {},
            { context: 'React search remove item aria label' }
          )}
          placeholder={Drupal.t('All languages')}
          multiselect
          label={B2Label}
          // options={taskAreasOptions}
          // value={taskAreaSelection}
          id={SearchComponents.B2}
          // onChange={setTaskAreaFilter}
        />
        {/* @ts-ignore */}
        <Select
          clearable
          clearButtonAriaLabel={Drupal.t('Clear @label selection', { '@label': WeightedEducationLabel }, { context: 'React search clear selection label' })}
          className='hdbt-search--react__dropdown'
          selectedItemRemoveButtonAriaLabel={Drupal.t(
            'Remove item',
            {},
            { context: 'React search remove item aria label' }
          )}
          placeholder={Drupal.t('All', {}, {context: 'React search all placeholder'})}
          multiselect
          label={WeightedEducationLabel}
          // options={taskAreasOptions}
          // value={taskAreaSelection}
          id={SearchComponents.WeightedEducation}
          // onChange={setTaskAreaFilter}
        />
        {/* @ts-ignore */}
        <Select
          clearable
          clearButtonAriaLabel={Drupal.t('Clear @label selection', { '@label': BilingualEducationLabel }, { context: 'React search clear selection label' })}
          className='hdbt-search--react__dropdown'
          selectedItemRemoveButtonAriaLabel={Drupal.t(
            'Remove item',
            {},
            { context: 'React search remove item aria label' }
          )}
          placeholder={Drupal.t('All', {}, {context: 'React search all placeholder'})}
          multiselect
          label={BilingualEducationLabel}
          // options={taskAreasOptions}
          // value={taskAreaSelection}
          id={SearchComponents.BilingualEducation}
          // onChange={setTaskAreaFilter}
        />
      </div>
      <div className='hdbt-search--react__submit'>
        <Button
          className='hdbt-search--react__submit-button'
          type='submit'
          variant='primary'
          theme='black'
        >
          {Drupal.t('Search')}
        </Button>
        </div>
      <SelectionsContainer keys={keys} />
    </form>
  );
};

export default FeatureFormContainer;
