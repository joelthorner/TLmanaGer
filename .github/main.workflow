workflow "New workflow" {
  on = "release"
  resolves = ["publish_chrome_store"]
}

action "publish_chrome_store" {
  uses = "publish_chrome_store"
  secrets = ["CHROME_CLIENT_ID", "CHROME_CLIENT_SECRET", "CHROME_REFRESH_TOKEN"]
}
