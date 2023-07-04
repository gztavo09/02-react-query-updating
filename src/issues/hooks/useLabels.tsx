import { useQuery } from '@tanstack/react-query'
import { gitHubApi } from '../../api/gitHubApi'
import { Label } from '../interfaces/label'
import { sleep } from '../../helpers/sleep'


const getLabels = async(): Promise<Label[]> => {

    await sleep(2)

    //Sobreescribiendo el header de esta peticion por un error externo en github
    const { data } = await gitHubApi.get<Label[]>('labels', {
        headers: {
            Authorization: null
        }
    })
    return data
  }

export const useLabels = () => {
    const labelsQuery = useQuery(
        ['labels'],
        getLabels,
        {
            // staleTime: 1000 * 60 * 60,
            // initialData: [],
            placeholderData: [
                {
                    id: 739761016,
                    node_id: "MDU6TGFiZWw3Mzk3NjEwMTY=",
                    url: "https://api.github.com/repos/facebook/react/labels/Component:%20Reconciler",
                    name: "Component: Reconciler",
                    color: "f9a798",
                    default: false,
                },
                {
                    id: 2281766624,
                    node_id: "MDU6TGFiZWwyMjgxNzY2NjI0",
                    url: "https://api.github.com/repos/facebook/react/labels/Component:%20Scheduling%20Profiler",
                    name: "Component: Scheduling Profiler",
                    color: "1dc3d6",
                    default: false,
                    description: ""
                }
            ]
        }
    )
    
    return {
        labelsQuery
    };
}
