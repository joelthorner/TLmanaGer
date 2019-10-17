workflow "New workflow" {
  on = "release"
  resolves = ["techulus/push-github-action@master"]
}

action "publish_chrome_store" {
  uses = "joelthorner/TLmanaGer/publish_chrome_store@master"
  secrets = ["CHROME_CLIENT_ID", "CHROME_CLIENT_SECRET", "CHROME_REFRESH_TOKEN"]
}

action "techulus/push-github-action@master" {
  uses = "techulus/push-github-action@master"
  needs = ["publish_chrome_store"]
}
