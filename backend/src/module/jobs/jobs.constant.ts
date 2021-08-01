export const jobType = {
  facebookReact: 'FACEBOOK_REACTIONS',
  facebookComment: 'FACEBOOK_COMMENTS',
  facebookCreateAccount: 'FACEBOOK_CREATE_ACCOUNT',
  googleCreateAccount: 'GOOGLE_CREATE_ACCOUNT',
};
export const jobGroupData = ({type, post_link, numberAccount}) => {
    switch(type){
        case "FACEBOOK_REACTIONS":
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