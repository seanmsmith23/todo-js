require 'rails_helper'


describe "Homepage" do
  it "Should have a place to type a todo" do
    visit root_path

    expect(page).to have_selector('#todo')
    expect(page).to have_button("Create Todo")
  end
end
