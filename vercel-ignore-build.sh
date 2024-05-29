#any other branches that you have webhooks for can go here
currentBranch=$(echo $VERCEL_BRANCH_URL | grep -Eo '(dev|staging|main)')
if [ -z $currentBranch ]; then
    exit 0
fi

result=$(curl 'https://api.vercel.com:443/v6/deployments?limit=5&teamId=team_cXIMR8D2hD4beAIzUxCwUCEq' -H "Authorization: Bearer $VERCEL_API_KEY")

echo "
    const items=$result.deployments;
    const buildTriggeredByHook=items.findIndex((itm) => (
        itm.state === 'BUILDING' && itm?.meta?.deployHookRef?.includes('$currentBranch')
    ));
    console.log(buildTriggeredByHook != -1);
" > node_run_script.js

buildTriggeredByHook=$(node node_run_script.js)

echo "this build was triggered by a hook: $buildTriggeredByHook"

if [ $buildTriggeredByHook = true ]; then
    exit 1
else
    exit 0
fi