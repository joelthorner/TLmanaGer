workflow "New workflow" {
  on = "release"
  resolves = ["create_zip"]
}

action "create_zip" {
  uses = "create_zip"
}
