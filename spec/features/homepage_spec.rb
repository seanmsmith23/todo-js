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

  it "should show a flash message that fades out" do
    visit root_path

    fill_in 'todo', with: "Haircut"
    click_button("Create Todo")

    expect(page).to have_content("Todo created")

    sleep(6)

    expect(page).to_not have_content("Todo created")
  end

  it "should show a flash that can be deleted by clicking the x" do
    visit root_path
    fill_in 'todo', with: "Haircut"
    click_button("Create Todo")

    expect(page).to have_content("Todo created")

    find('.x').click

    expect(page).to_not have_content("Todo created")
  end
end
