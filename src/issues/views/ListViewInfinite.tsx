import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues, useIssuesInfinite } from '../hooks';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../interfaces';

export const ListViewInfinite = () => {

  const [ state, setState ] = useState<State>()
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])

  const { issuesQuery } = useIssuesInfinite({state, labels: selectedLabels})

  const onLabelChanged = ( labelName: string ) => {
    (selectedLabels.includes(labelName)) 
    ? setSelectedLabels( selectedLabels.filter(label => label !== labelName))
    : setSelectedLabels([...selectedLabels, labelName])
  }

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          issuesQuery.isLoading 
          ? (<LoadingIcon />)
          :( <IssueList 
            state={ state } 
            onStateChanged={(newState) => setState(newState)}
            issues={ issuesQuery.data?.pages.flat() || [] } />)
        }
        <button disabled={ !issuesQuery.hasNextPage } className='btn btn-outline-primary mt-2'
          onClick={() => issuesQuery.fetchNextPage()}
        >Load more...</button>
      </div>
      
      <div className="col-4">
        <LabelPicker 
          selectedLabels={ selectedLabels }
          onChange={(labelName) => onLabelChanged(labelName)}
        />
      </div>
    </div>
  )
}
