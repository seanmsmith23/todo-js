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

  it "should allow a task to be deleted when clicking the x" do
    visit root_path
    fill_in 'todo', with: "Haircut"
    click_button("Create Todo")

    find('button.task-x').click

    expect(page).to_not have_content("Haircut")
  end

  it "the flash message on task deleted can be removed" do
    visit root_path
    fill_in 'todo', with: "Haircut"
    click_button("Create Todo")

    find('button.task-x').click

    expect(page).to have_content("Todo deleted")

    find('button.remove-flash').click

    expect(page).to_not have_content("Todo deleted")
  end

  it "the flash message on task delete should fade out after 5 seconds" do
    visit root_path
    fill_in 'todo', with: "Haircut"
    click_button("Create Todo")

    find('button.task-x').click

    expect(page).to have_content("Todo deleted")

    sleep(6)

    expect(page).to_not have_content("Todo deleted")
  end

  it "should allow a task to be completed and moved to the complete section" do
    visit root_path
    fill_in 'todo', with: "Haircut"
    click_button("Create Todo")

    find('.check-mark').click

    within('#all-todos') do
      expect(page).to_not have_content("Haircut")
    end

    within('.completed') do
      expect(page).to have_content("Haircut")
    end
  end
end
