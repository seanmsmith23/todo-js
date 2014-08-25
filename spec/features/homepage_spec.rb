require 'rails_helper'


describe "Homepage" do
  it "Should have a place to type a todo" do
    visit root_path

    expect(page).to have_selector('#todo')
    expect(page).to have_button("Create Todo")
  end

  it "Should show todo items when form is submitted" do
    visit root_path

    fill_in 'todo', with: "Haircut"
    click_button("Create Todo")

    expect(page).to have_content("Haircut")
  end
end
