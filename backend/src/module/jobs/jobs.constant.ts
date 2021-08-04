export const JOB_TYPE = {
  phimmoiFirmList: 'PHIMMOI_FIRM_LIST',
};
export const jobGroupData = ({type, post_link, numberAccount}) => {
    switch(type){
        case "PHIMMOI_FIRM_LIST":
            return {
                status: false,
                post_link: post_link
            }
        case "FACEBOOK_CREATE_ACCOUNT":
            return {
                status: false,
                numberAccount: numberAccount
            }
        default:
            return {}
    }
}