export const JOB_TYPE = {
  PHIMMOI_FILM_DETAIL: 'PHIMMOI_FILM_DETAIL',
  PHIMMOI_FILM_LIST: 'PHIMMOI_FILM_LIST',
  PHIMMOI_CATEGORY_LIST: 'PHIMMOI_CATEGORY_LIST',
};
export const jobGroupData = ({type, post_link, numberAccount}) => {
    switch(type){
        case "PHIMMOI_FILM_LIST":
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