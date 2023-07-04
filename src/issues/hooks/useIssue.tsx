import { useQuery } from "@tanstack/react-query"
import { gitHubApi } from "../../api/gitHubApi"
import { Issue } from "../interfaces"
import { sleep } from "../../helpers/sleep"

const getIssueInfo = async (issueNumber: number) : Promise<Issue> => {
    sleep(2)
    const { data } = await gitHubApi.get<Issue>(`/issues/${ issueNumber }`)
    console.log("data", data);
    
    return data;
}

const getIssueComments = async (issueNumber: number) : Promise<Issue> => {
    sleep(2)
    const { data } = await gitHubApi.get<Issue>(`/issues/${ issueNumber }/comments`)
    console.log("data", data);
    
    return data;
}

export const useIssue = (issueNumber: number) => {
    const issueQuery = useQuery(
        [
            'issue', issueNumber
        ],
        () => getIssueInfo(issueNumber)
    )

    // AQUI LE ESTAMOS DICIENDO QUE ESTE SEGUNDO QUERY NO SE EJECUTARA (ENABLE) HASTA QUE EL PRIMERO DEVUELVA DATA,
    // AL TENER DATA YA NO NECESITAMOS EL PARAMETRO ISSUENUMBER SI NO EXTRAEMOS DEL PRIMER QUERY EL ID OSEA NUMBER

    const issueCommentsQuery = useQuery(
        [
            'issue', issueNumber, 'comments'
        ],
        () => getIssueComments(issueQuery.data!.number),
        {
            enabled: issueQuery.data !== undefined
        }
    )

    return {
        issueQuery,
        issueCommentsQuery
    }
}
